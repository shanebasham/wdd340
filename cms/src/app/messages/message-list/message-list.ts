import { Component, OnInit, OnDestroy, NgZone} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

import { Contact } from '../../contacts/contact.model';
import { ContactService } from '../../contacts/contact.service';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-message-list',
  standalone: false,
  templateUrl: './message-list.html',
  styleUrl: './message-list.css'
})

export class MessageList implements OnInit, OnDestroy {
  messages: Message[] = [];
  subscription: Subscription;
  messages$!: Observable<Message[]>;
  contacts: Contact[] = [];

  constructor(private dataStorageService: DataStorageService,
              private contactService: ContactService,
              private messageService: MessageService,
              private router: Router,
              private route: ActivatedRoute,
              private zone: NgZone) {}

  ngOnInit() {
    this.messages$ = this.dataStorageService.fetchMessages();
    this.dataStorageService.fetchContacts().subscribe({
      next: (contacts) => {
        this.contacts = contacts;
      },
      error: (err) => {
        console.error('Failed to load contacts:', err);
        this.contacts = [];
      }
    });
  }

  getSenderName(senderId: string): string {
    const contact = this.contacts.find(c => c.id === senderId);
    return contact ? contact.name : 'Unknown';
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
