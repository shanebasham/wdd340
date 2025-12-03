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
    private messageService: MessageService,
    private contactService: ContactService,
    private dataStorage: DataStorageService
  ) {}

  ngOnInit() {
    // this.messageService.messageSelectedEvent.subscribe((message: Message) => {
    //   this.selectedMessage = message;
    //   console.log('message received by parent', message);
    // });
  }
  // onMessageSelected(message: Message) {
  //   this.selectedMessage = message;
  //   console.log("message received by parent component");
  // }
}
