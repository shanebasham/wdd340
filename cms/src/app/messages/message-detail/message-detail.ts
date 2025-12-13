import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Contact } from '../../contacts/contact.model';
import { ContactService } from '../../contacts/contact.service';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'app-message-detail',
  standalone: false,
  templateUrl: './message-detail.html',
  styleUrl: './message-detail.css'
})

export class MessageDetail implements OnInit {
  contact: Contact;
  message: Message;
  messageSender: string = '';
  id: string;
  nativeWindow: any;

  constructor(
    private contactService: ContactService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private windowRefService: WindRefService) {this.nativeWindow = this.windowRefService.getNativeWindow();}

  ngOnInit() {
  this.route.params.subscribe(params => {
    this.id = params['id'];
    console.log("Opening message ID:", this.id);
    // Get the message
    this.message = this.messageService.getMessage(this.id);
    if (!this.message) {
      console.error("Message not found:", this.id);
      this.messageSender = 'Unknown';
      return;
    }
    // Get all contacts
    const contacts = this.contactService.getContacts();
    console.log("Contacts loaded:", contacts);
    // Find the sender
    const senderId = this.message.sender;
    if (!senderId) {
      this.messageSender = 'Unknown';
    } else {
      // Handle both ObjectId and string
      const contact = contacts.find(c => 
        c._id?.toString() === senderId.toString() || 
        c.id?.toString() === senderId.toString()
      );
      this.messageSender = contact ? contact.name : 'Unknown';
    }

    console.log("Message sender:", this.messageSender);
  });
}

  // ngOnInit() {
  //   this.route.params.subscribe((params: Params) => {
  //     this.id = params['id'];
  //     this.message = this.messageService.getMessage(this.id);
  //     if (!this.message) {
  //       console.warn(`Message with id ${this.id} not found.`);
  //       this.messageSender = 'Unknown';
  //       return;
  //     }
  //     if (typeof this.message.sender === 'number') {
  //       const contact = this.contactService
  //         .getContacts()
  //         .find(c => c.id === this.message.sender);

  //       this.messageSender = contact ? contact.name : 'Unknown';
  //       return;
  //     }
  //     if (typeof this.message.sender === 'string' &&
  //         this.message.sender.toLowerCase() === 'you') {
  //       this.messageSender = 'You';
  //       return;
  //     }
  //     this.messageSender = 'Unknown';
  //   });
  // }
    onEditMessage() {
      this.router.navigate(['edit'], {relativeTo: this.route});
      // this.router.navigate(['/messages', this.id, 'edit']), {relativeTo: this.route};
    }
    onDeleteMessage() {
      if (!this.message) return;
      this.messageService.deleteMessage(this.message, () => {
        this.router.navigate(['/messages']);
      });
    }
}
