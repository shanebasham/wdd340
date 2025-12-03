import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Message } from '../message.model';
import { ContactService } from '../../contacts/contact.service';

@Component({
  selector: 'app-message-item',
  standalone: false,
  templateUrl: './message-item.html',
  styleUrl: './message-item.css'
})

export class MessageItem implements OnInit {
  @Input() message!: Message;
  @Input() index!: number;
  messageSender: string = 'Unknown';

  constructor(
    private contactService: ContactService
  ) {}

  ngOnInit() {
  const senderIndex = Number(this.message.sender);

  const contacts = this.contactService.getContacts();
  this.messageSender = contacts[senderIndex] ? contacts[senderIndex].name : 'Unknown';
  
  const senderLower = this.message.sender.toLowerCase();
          if (senderLower === 'you') {
            this.messageSender = 'You';}
  }
}
