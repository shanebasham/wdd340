import { Injectable } from '@angular/core';
import { Subject, combineLatest } from 'rxjs';
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

  private messagesUrl = 'http://localhost:3000/messages';

  constructor(private http: HttpClient) {}

  private sortAndSend() {
    this.messages.sort((a, b) => a.subject.localeCompare(b.subject));
    this.messagesChanged.next(this.messages.slice());
  }
  getMessages() {
    return this.messages.slice();
  }
  getMessage(id: string) {
    return this.messages.find(m => m.id?.toString() === id.toString());
  }
  // addMessage(message: Message) {
  //   this.messages.push(message);
  //   this.storeMessages();
  // }
  addMessage(message: Message, callback?: () => void) {
    if (!message) return;
    if (!message.id) message.id = this.getMaxId();

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<Message>(this.messagesUrl, message, { headers })
      .subscribe({
        next: (addedMessage) => {
          if (!addedMessage || !addedMessage.id) {
            console.error('Invalid message returned from server:', addedMessage);
            this.error.next('Failed to add message: invalid server response.');
            return;
          }
          this.messages.push(addedMessage);
          this.sortAndSend();
          if (callback) callback();
        },
        error: (err) => {
          console.error('Error adding message:', err);
          this.error.next('Failed to add message on server.');
        }
      });
  }
  // updateMessage(index: number, newMessage: Message) {
  //   this.messages[index] = newMessage;
  //   this.storeMessages();
  // }
  updateMessage(originalMessage: Message, newMessage: Message, callback?: () => void) {
    if (!originalMessage || !newMessage) return;
    const pos = this.messages.findIndex(m => m.id === originalMessage.id);
    if (pos < 0) return;
    newMessage.id = originalMessage.id;
    newMessage._id = originalMessage._id;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(`${this.messagesUrl}/${originalMessage.id}`, newMessage, { headers })
      .subscribe({
        next: () => {
          this.messages[pos] = newMessage;
          this.sortAndSend();
          if (callback) callback();
        },
        error: (err) => {
          console.error('Error updating message:', err);
          this.error.next('Failed to update message on server.');
        }
      });
  }
  // deleteMessage(index: number) {
  //   this.messages.splice(index, 1);
  //   this.storeMessages();
  // }
  deleteMessage(message: Message, callback?: () => void) {
    if (!message) return;
    const pos = this.messages.findIndex(m => m.id === message.id);
    if (pos < 0) return;
    this.http.delete(`${this.messagesUrl}/${message.id}`)
      .subscribe({
        next: () => {
          this.messages.splice(pos, 1);
          this.sortAndSend();
          if (callback) callback();
        },
        error: (err) => {
          console.error('Error deleting message:', err);
          this.error.next('Failed to delete message on server.');
        }
      });
  }
  getMaxId(): string {
    let maxId = 0;
    this.messages.forEach(message => {
      if (!message || !message.id) return;
      const currentId = +message.id;
      if (currentId > maxId) maxId = currentId;
    });
    return (maxId + 1).toString();
  }
  storeMessages() {
    const messagesString = JSON.stringify(this.messages);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(this.messagesUrl, messagesString, { headers })
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
