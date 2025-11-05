import { Component, OnInit} from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-list',
  standalone: false,
  templateUrl: './message-list.html',
  styleUrl: './message-list.css'
})

export class MessageList implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: MessageService) {
    this.messages = this.messageService.getMessages();
    this.messageService.messageChangedEvent.subscribe((messages: Message[]) => {
      this.messages = messages;
    });
  }

  ngOnInit(): void {
    this.messages = this.messageService.getMessages();
  }
  onSelectedMessage(message: Message) { 
    this.messageService.messageSelectedEvent.emit(message);
    console.log('message selected in list', message);
  }
  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
