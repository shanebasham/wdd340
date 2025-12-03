import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http'

import {Contact} from './contact.model';

@Injectable({
  providedIn: 'root'
})

export class ContactService {
  contacts: Contact[] = [];
  // contactSelectedEvent = new Subject<Contact>();
  // contactChangedEvent = new Subject<Contact[]>();
  // contactListChangedEvent = new Subject<Contact[]>();
  contactsChanged = new Subject<Contact[]>();
  error = new Subject<string>();

  // private _contacts: Contact[] = [];
  // private _groupContacts: Contact[] = [];

  // public contacts$ = new BehaviorSubject<Contact[]>([]);
  // public groupContacts$ = new BehaviorSubject<Contact[]>([]);

  constructor(private http: HttpClient) {}

  // getGroupContacts() { return [...this._groupContacts]; }

  // addToGroup(contact: Contact) {
  //   if (!this._groupContacts.find(c => c.id === contact.id)) {
  //     this._groupContacts.push(contact);
  //     this.groupContacts$.next(this.getGroupContacts());
  //   }
  // }
  // removeFromGroup(contact: Contact) {
  //   this._groupContacts = this._groupContacts.filter(c => c.id !== contact.id);
  //   this.groupContacts$.next([...this._groupContacts]);
  // }
  getContacts() {
    return this.contacts.slice();
  }
  getContact(index: number) {
    return this.contacts[index];
  }
  addContact(contact: Contact) {
    this.contacts.push(contact);
    this.storeContacts();
  }
  updateContact(index: number, newContact: Contact) {
    this.contacts[index] = newContact;
    this.storeContacts();
  }
  deleteContact(index: number) {
    this.contacts.splice(index, 1);
    this.storeContacts();
  }
  // getContacts(): Contact[] {
  //   return this.contacts.slice();
  // }
  // getContact(id: string): Contact | null {
  //   for (const contact of this.contacts) {
  //     if (String(contact.id) === id) {
  //       return contact;
  //     }
  //   }
  //   return null;
  // }
  // getMaxId(): number {
  //   let maxId = 0;
  //   for (const contact of this.contacts) {
  //     const currentId = parseInt(contact.id, 10);
  //     if (currentId > maxId) {
  //       maxId = currentId;
  //     }
  //   }
  //   return maxId;
  // }
  // addContact(contact: Contact) {
  //   if (!contact) {
  //       return;
  //   } 
  //   this.maxContactId++;
  //   contact.id = String(this.maxContactId);
  //   this.contacts.push(contact);
  //   this.contactChangedEvent.next(this.contacts.slice());
  // }
  // updateContact(originalContact: Contact, newContact: Contact) {
  //   if (!originalContact || !newContact) {
  //       return;
  //   }
  //   const pos = this.contacts.indexOf(originalContact);
  //   if (pos < 0) {
  //       return;
  //   }
  //   newContact.id = originalContact.id;
  //   this.contacts[pos] = newContact;
  //   this.contactChangedEvent.next(this.contacts.slice());
  // }
  // deleteContact(contact: Contact) {
  //   if (!contact) {
  //       return;
  //   }
  //   const pos = this.contacts.indexOf(contact);
  //   if (pos < 0) {
  //       return;
  //   }
  //   this.contacts.splice(pos, 1);
  //   this.contactChangedEvent.next(this.contacts.slice());
  // }

  storeContacts() {
    const contactsString = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put('https://cms-project-30759-default-rtdb.firebaseio.com/cms/contacts.json', contactsString, { headers })
      .subscribe({
        next: () => {
          this.contactsChanged.next(this.contacts.slice());
        },
        error: (err) => {
          console.error('Error storing contacts:', err);
          this.error.next('Failed to store contacts on the server.');
        }
      });
  }
  setContacts(contacts: Contact[]) {
    this.contacts = contacts;
    this.contactsChanged.next(this.contacts.slice());
  }
  // setContacts(contacts: Contact[]) {
  //   this._contacts = contacts;
  //   this.contacts$.next(this.getContacts());
  // }
}
