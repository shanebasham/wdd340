import { Component, OnInit } from '@angular/core';

import { Contact } from './contact.model';
import { ContactService } from './contact.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-contacts',
  standalone: false,
  templateUrl: './contacts.html',
  styleUrl: './contacts.css'
})

export class Contacts implements OnInit {
  selectedContact: Contact;

  constructor(private contactService: ContactService,
    private dataStorage: DataStorageService
  ) {}

  ngOnInit() {
      // this.contactService.contactSelectedEvent
      //   .subscribe(
      //     (contact: Contact) => {
      //       this.selectedContact = contact;
      //     }
      //   );
    }

  // onContactSelected(contact: Contact) {
  //   this.selectedContact = contact;
  //   console.log("contact received by parent component");
  // }
}
