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

  constructor(
    private contactService: ContactService,
    private dataStorage: DataStorageService
  ) {}

  ngOnInit() {
    console.log("Contacts component initializing…");
      Promise.all([
        this.dataStorage.fetchContacts().toPromise()
      ])
      .then(() => {
        console.log("Contacts loaded:", this.contactService.getContacts());
      })
      .catch(err => console.error("Error loading initial data", err));
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
