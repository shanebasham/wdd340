import { Component } from '@angular/core';

import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  standalone: false,
  templateUrl: './message-list.html',
  styleUrl: './message-list.css'
})
export class MessageList {
  messages: Message[] = [
    new Message(1, 'Hello', 'Welcome to messages!', 'Shane'),
    new Message(2, 'Help', 'When is assignment 3 due?', 'Steve Johnson'),
    new Message(3, 'Answer', 'Assignment 3 is due tonight...', 'Mark Smith')
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
