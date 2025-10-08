import { Component, EventEmitter, Output } from '@angular/core';

import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-list',
  standalone: false,
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css'
})
export class ContactList {
  contacts: Contact[] = [
    // new Contact(0, 'test contact', 'this is a test email', 123456789, 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/AS16-118-18885.jpg/1200px-AS16-118-18885.jpg', null),
    new Contact(1, 'R. Kent Jackson', 'jacksonk@byui.edu', 2084963771, 'assets/images/jacksonk.jpg', null),
    new Contact(2, 'Rex Barzee', 'barzeer@byui.edu', 2084963768, 'assets/images/barzeer.jpg', null)];
  
  @Output() selectedContactEvent = new EventEmitter<Contact>();

  onSelected(contact: Contact) {
    this.selectedContactEvent.emit(contact);
    console.log(contact)
  }
}
