import { MessageService } from '../../../application/services/message.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'neurodash-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public messageForm: FormGroup;

  constructor(private fb: FormBuilder, private MessageService: MessageService) {
    this.messageForm = this.fb.group({
      message: ['']
    });
  }

  ngOnInit(): void {
    console.log('ChatComponent ngOnInit');
  }

  public sendMessage(): void {
    const messageContent = this.messageForm.value.message;
    if (messageContent) {
      this.MessageService.create(messageContent, '2', 'user').subscribe({
        next: (message) => {
          console.log('message', message);
          // Aqui você pode adicionar a mensagem à lista de mensagens
        },
        error: (error) => {
          console.error('error', error);
        }
      });
      this.messageForm.patchValue({ message: '' });
    }
  }
}
