import { Component } from '@angular/core';

@Component({
  selector: 'neurodash-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent {
  messages = [
    { id: 1, text: 'Olá! Como posso ajudar você hoje?', sender: 'bot', timestamp: new Date() },
    { id: 2, text: 'Preciso de ajuda com meu projeto', sender: 'user', timestamp: new Date() },
    { id: 3, text: 'Claro! Posso ajudá-lo com o que precisar.', sender: 'bot', timestamp: new Date() }
  ];

  newMessage = '';

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({
        id: this.messages.length + 1,
        text: this.newMessage,
        sender: 'user',
        timestamp: new Date()
      });
      this.newMessage = '';
    }
  }
}
