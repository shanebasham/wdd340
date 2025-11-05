import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { Contact } from '../../contacts/contact.model';
import { MessageService } from '../message.service';
import { ContactService } from '../../contacts/contact.service';

@Component({
  selector: 'app-message-item',
  standalone: false,
  templateUrl: './message-item.html',
  styleUrl: './message-item.css'
})

// export class MessageItem {
//   @Input() message!: Message;
//   messageSender: string = '';
// }

export class MessageItem implements OnInit {
  @Input() message: Message;
  @Output() selectedMessageEvent = new EventEmitter<void>();
  messageSender: string = '';

  constructor(
    private contactService: ContactService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    const contact = this.contactService.getContact(this.message.sender);
    this.messageSender = contact?.name || 'Unknown';
   }

  onSelected(message: Message) {
    this.selectedMessageEvent.emit(); 
    console.log(message);
  }
}
