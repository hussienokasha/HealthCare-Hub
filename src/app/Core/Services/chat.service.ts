import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  baseURL: string = 'http://ahmedsamir9-001-site1.gtempurl.com/api';
  constructor(private http: HttpClient) {
  }
  getinfo() {
    this.http.get(this.baseURL)
  }
}


