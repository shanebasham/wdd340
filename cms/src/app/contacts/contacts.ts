import { Component, Output } from '@angular/core';

import { Contact } from './contact.model';

@Component({
  selector: 'app-contacts',
  standalone: false,
  templateUrl: './contacts.html',
  styleUrl: './contacts.css'
})

export class Contacts {
  @Output() selectedContact: Contact;

  onContactSelected(contact: Contact) {
    this.selectedContact = contact;
    console.log("contact received by parent component");
  }
}
