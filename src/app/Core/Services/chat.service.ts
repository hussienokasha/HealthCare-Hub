import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject, ReplaySubject, take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { PaginationResult } from '../Models/pagination';
import { Message } from '../Models/message';
import { User } from '../Models/User';
import { Group } from '../Models/group';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseUrl = "https://localhost:7133/";
  private hubUrl = "https://localhost:7133/hubs/";
  private hubConnection?: HubConnection;
  private messageThreadSource = new ReplaySubject<Message[]>(1); // Ensure there's always a value
  messageThread$ = this.messageThreadSource.asObservable();

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  createHubConnection(user: User, otherUsername: string) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${this.hubUrl}message?user=${otherUsername}`, {
        accessTokenFactory: () => localStorage.getItem('token') || '' 
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch(err => {
      console.log(err);
      this.toastr.error('Error while starting connection');
    });

    this.hubConnection.on('ReceiveMessageRead', messages => {
      this.messageThreadSource.next(messages);
    });

    this.hubConnection.on('UpdateGroup', (group: Group) => {
      if (group.connections.some(x => x.username === otherUsername)) {
        this.messageThread$.pipe(take(1)).subscribe({
          next: messages => {
            messages.forEach(message => {
              if (!message.dateRead) {
                message.dateRead = new Date(Date.now());
              }
            });
            this.messageThreadSource.next([...messages]);
          }
        });
      }
    });

    this.hubConnection.on('NewMessage', message => {
      this.messageThread$.pipe(take(1)).subscribe({
        next: messages => {
          this.messageThreadSource.next([...messages, message]);
        }
      });
    });
  }

  stopHubConnection() {
    this.hubConnection?.stop().catch(err => console.log(err));
  }

  getMessages(pageNumber: number, pageSize: number, container: string) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container);
    return getPaginatedResult<Message[]>(`${this.baseUrl}message`, params, this.http);
  }

  getMessageThread(username: string) {
    return this.http.get<Message[]>(`${this.baseUrl}message/thread/${username}`);
  }

  async sendMessage(username: string, content: string) {
    return this.hubConnection?.invoke('SendMessage', { recipentUserName: username, content })
      .catch(err => console.log(err));
  }

  deleteMessage(id: number) {
    return this.http.delete(`${this.baseUrl}message/${id}`);
  }
}

export function getPaginatedResult<T>(url: string, params: HttpParams, http: HttpClient) {
  const paginatedResult: PaginationResult<T> = new PaginationResult<T>();
  return http.get<T>(url, { observe: 'response', params }).pipe(
    map(response => {
      if (response.body) {
        paginatedResult.result = response.body;
      }
      const pagination = response.headers.get('pagination');
      if (pagination) {
        paginatedResult.pagination = JSON.parse(pagination);
      }
      return paginatedResult;
    })
  );
}

export function getPaginationHeaders(pageNumber: number, pageSize: number) {
  let params = new HttpParams();
  params = params.append('pageNumber', pageNumber);
  params = params.append('pageSize', pageSize);
  return params;
}