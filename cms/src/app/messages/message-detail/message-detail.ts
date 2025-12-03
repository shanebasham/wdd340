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
  message: Message;
  messageSender: string = '';
  id: number;
  nativeWindow: any;

  constructor(private contactService: ContactService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router,
              private windowRefService: WindRefService) {
    this.nativeWindow = this.windowRefService.getNativeWindow();
    }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.message = this.messageService.getMessage(this.id);

          const contacts = this.contactService.getContacts();
          const contact = contacts.find(c => c.id === this.message.sender);
          this.messageSender = contact ? contact.name : 'Unknown';

          const senderLower = this.message.sender.toLowerCase();
          if (senderLower === 'you') {
            this.messageSender = 'You';}
    });
   }
    onEditMessage() {
      this.router.navigate(['edit'], {relativeTo: this.route});
      // this.router.navigate(['/messages', this.id, 'edit']), {relativeTo: this.route};
    }
    onDeleteMessage() {
      this.messageService.deleteMessage(this.id);
      this.router.navigate(['/messages']);
    }
}
