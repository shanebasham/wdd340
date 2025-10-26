import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { Contact } from '../../contacts/contact.model';
import { ContactService } from '../../contacts/contact.service';

@Component({
  selector: 'app-message-item',
  standalone: false,
  templateUrl: './message-item.html',
  styleUrl: './message-item.css'
})

export class MessageItem implements OnInit {
  @Input() message!: Message;
  @Output() selectedContactEvent = new EventEmitter<Message>();
  messageSender: string = '';

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    const contact = this.contactService.getContact(this.message.sender);
    this.messageSender = contact?.name || 'Unknown';
   }
  onSelectedMessage() {
    this.selectedContactEvent.emit(this.message); 
    console.log('emitted message', this.message);
  }
}
