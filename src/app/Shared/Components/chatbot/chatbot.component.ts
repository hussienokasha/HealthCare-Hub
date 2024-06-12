import { Component } from '@angular/core';
import { ChatbotService } from 'src/app/Core/Services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
})
export class ChatbotComponent  {
  constructor(private chat:ChatbotService){}
  isLoad=false;
  ngOnInit(){

  }
  getResponse(mes:string){
    this.isLoad=true;
    const modalBody = document.getElementById('modalBody');
    let messageElement = document.createElement('p');
    messageElement.classList.add('rounded-3', 'text-bg-secondary', 'px-2', 'p-1', 'ms-auto');
    messageElement.style.width = 'fit-content';
    this.chat.sendMessage(mes).subscribe({
      next:(res:any)=>{
        messageElement.textContent = res[0].text;
        modalBody?.appendChild(messageElement);
        this.isLoad=false;
      }
    })
  }
  sendMessage() {
    const inputElement = document.getElementById('chatInput') as HTMLInputElement;
    const message = inputElement.value;

    if (message.trim() !== '') {
      const modalBody = document.getElementById('modalBody');
      let messageElement = document.createElement('p');
      messageElement.classList.add('rounded-3', 'text-bg-primary','px-2' ,'p-1', 'me-auto');
      messageElement.style.width='fit-content'
      messageElement.textContent = message;
      modalBody?.appendChild(messageElement);
      this.getResponse(message);
      inputElement.value = '';
    }
  }
}
