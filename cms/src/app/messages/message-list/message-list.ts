import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-list',
  standalone: false,
  templateUrl: './message-list.html',
  styleUrl: './message-list.css'
})

export class MessageList implements OnInit {
  @Output() messageSelected = new EventEmitter<Message>();
  messages: Message[] = [];
  selectedMessage: Message | null = null;

  constructor(private messageService: MessageService) {
    this.messages = this.messageService.getMessages();
    this.messageService.messageChangedEvent.subscribe((messages: Message[]) => {
      this.messages = messages;
    });
  }

  ngOnInit(): void {
    this.messages = this.messageService.getMessages();
  }
  onMessageSelected(message: Message) {
    this.messageSelected.emit(message);  
    this.messageService.messageSelectedEvent.emit(message);
    console.log('message selected in list', message);
  }
  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
