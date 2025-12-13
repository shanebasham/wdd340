import { Component, OnInit } from '@angular/core';

import { Message } from './message.model';
import { MessageService } from './message.service';
import { ContactService } from '../contacts/contact.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-messages',
  standalone: false,
  templateUrl: './messages.html',
  styleUrl: './messages.css'
})

export class Messages implements OnInit {
  // selectedMessage?: Message;

  constructor(
    private dataStorageService: DataStorageService,
    private messageService: MessageService,
    private contactService: ContactService,
    private dataStorage: DataStorageService
  ) {}

  ngOnInit() {
      console.log("Messages component initializing…");
      Promise.all([
        this.dataStorage.fetchContacts().toPromise(),
        this.dataStorage.fetchMessages().toPromise()
      ])
      .then(() => {
        console.log("Contacts loaded:", this.contactService.getContacts());
        console.log("Messages loaded:", this.messageService.getMessages());
      })
      .catch(err => console.error("Error loading initial data", err));
    }
  // ngOnInit() {
  //   console.log("Messages component initializing…");
  //   this.dataStorageService.fetchContacts().subscribe({
  //     next: () => console.log('Contacts loaded'),
  //     error: err => console.error('Failed to load contacts', err)
  //   });
  //   this.dataStorageService.fetchMessages().subscribe({
  //     next: () => console.log('Messages loaded'),
  //     error: err => console.error('Failed to load messages', err)
  //   });
  // }
  // ngOnInit() {
    // this.messageService.messageSelectedEvent.subscribe((message: Message) => {
    //   this.selectedMessage = message;
    //   console.log('message received by parent', message);
    // });
  // }
  // onMessageSelected(message: Message) {
  //   this.selectedMessage = message;
  //   console.log("message received by parent component");
  // }
}
