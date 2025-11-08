import {EventEmitter, Injectable} from '@angular/core';
import { Subject } from 'rxjs';

import {Contact} from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})

export class ContactService {
  contacts: Contact [] =[];
  contactSelectedEvent = new Subject<Contact>();
  contactChangedEvent = new Subject<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }
  getContact(id: string): Contact | null {
    for (const contact of this.contacts) {
      if (String(contact.id) === id) {
        return contact;
      }
    }
    return null;
  }
  getMaxId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      const currentId = parseInt(contact.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
  addContact(contact: Contact) {
    if (!contact) {
        return;
    } 
    this.maxContactId++;
    contact.id = String(this.maxContactId);
    this.contacts.push(contact);
    this.contactChangedEvent.next(this.contacts.slice());
  }
  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
        return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
        return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.contactChangedEvent.next(this.contacts.slice());
  }
  deleteContact(contact: Contact) {
    if (!contact) {
        return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
        return;
    }
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.next(this.contacts.slice());
  }
}
