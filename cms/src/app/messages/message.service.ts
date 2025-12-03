import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  messages: Message [] = [];
  // messageSelectedEvent = new EventEmitter<Message>();
  // messageChangedEvent = new EventEmitter<Message[]>();
  messagesChanged = new Subject<Message[]>();
  error = new Subject<string>();

  private firebaseUrl = 'https://cms-project-30759-default-rtdb.firebaseio.com/cms/messages.json';

  constructor(private http: HttpClient) {}

  getMessages() {
    return this.messages.slice();
  }
  getMessage(index: number) {
    return this.messages[index];
  }
  addMessage(message: Message) {
    this.messages.push(message);
    this.storeMessages();
  }
  updateMessage(index: number, newMessage: Message) {
    this.messages[index] = newMessage;
    this.storeMessages();
  }
  deleteMessage(index: number) {
    this.messages.splice(index, 1);
    this.storeMessages();
  }
  storeMessages() {
    const messagesString = JSON.stringify(this.messages);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(this.firebaseUrl, messagesString, { headers })
      .subscribe({
        next: () => {
          this.messagesChanged.next(this.messages.slice());
        },
        error: (err) => {
          console.error('Error storing messages:', err);
          this.error.next('Failed to store messages on the server.');
        }
      });
  }
  setMessages(messages: Message[]) {
      this.messages = messages;
      this.messagesChanged.next(this.messages.slice());
    }
}
