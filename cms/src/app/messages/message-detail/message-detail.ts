import { Component, Input } from '@angular/core';

import { ContactService } from '../../contacts/contact.service';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-detail',
  standalone: false,
  templateUrl: './message-detail.html',
  styleUrl: './message-detail.css'
})
export class MessageDetail {
  @Input() message!: Message;
  messageSender: string = '';

  constructor(
    private contactService: ContactService,
  ) {}

  ngOnInit() {
    const contact = this.contactService.getContact(this.message.sender);
    this.messageSender = contact?.name || 'Unknown';
   }
}
