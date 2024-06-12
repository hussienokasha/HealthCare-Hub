import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:5055/webhooks/rest/webhook';

  sendMessage(message: string) {
    let header = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post(this.baseUrl, { 'message': message }, { headers: header }).pipe(catchError(e =>
      throwError(() => {
        console.log(e)
      })))
  }
}
