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

  private contactsUrl = 'http://localhost:3000/contacts';

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
  private sortAndSend() {
    this.contacts.sort((a, b) => a.name.localeCompare(b.name));
    this.contactsChanged.next(this.contacts.slice());
  }
  getContacts() {
    return this.contacts.slice();
  }
  getContact(id: string) {
    return this.contacts.find(c => c.id?.toString() === id.toString());
  }
  // addContact(contact: Contact) {
  //   this.contacts.push(contact);
  //   this.storeContacts();
  // }
  addContact(contact: Contact, callback?: () => void) {
    if (!contact) return;
    if (!contact.id) contact.id = this.getMaxId();

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<Contact>(this.contactsUrl, contact,  { headers })
      .subscribe({
        next: (addedContact) => {
          if (!addedContact || !addedContact.id) {
            console.error('Invalid contact returned from server:', addedContact);
            this.error.next('Failed to add contact: invalid server response.');
            return;
          }
          this.contacts.push(addedContact);
          this.sortAndSend();
          if (callback) callback();
        },
        error: (err) => {
          console.error('Error adding contact:', err);
          this.error.next('Failed to add contact on server.');
        }
      });
  }
  // updateContact(index: number, newContact: Contact) {
  //   this.contacts[index] = newContact;
  //   this.storeContacts();
  // }
  updateContact(originalContact: Contact, newContact: Contact, callback?: () => void) {
    if (!originalContact || !newContact) return;
    const pos = this.contacts.findIndex(c => c.id === originalContact.id);
    if (pos < 0) return;
    newContact.id = originalContact.id;
    newContact._id = originalContact._id;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(`${this.contactsUrl}/${originalContact.id}`, newContact, { headers })
      .subscribe({
        next: () => {
          this.contacts[pos] = newContact;
          this.sortAndSend();
          if (callback) callback();
        },
        error: (err) => {
          console.error('Error updating contact:', err);
          this.error.next('Failed to update contact on server.');
        }
      });
  }
  // deleteContact(index: number) {
  //   this.contacts.splice(index, 1);
  //   this.storeContacts();
  // }
  deleteContact(contact: Contact, callback?: () => void) {
    if (!contact) return;
    const pos = this.contacts.findIndex(c => c.id === contact.id);
    if (pos < 0) return;
    this.http.delete(`${this.contactsUrl}/${contact.id}`)
      .subscribe({
        next: () => {
          this.contacts.splice(pos, 1);
          this.sortAndSend();
          if (callback) callback();
        },
        error: (err) => {
          console.error('Error deleting contact:', err);
          this.error.next('Failed to delete contact on server.');
        }
      });
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
  getMaxId(): string {
    let maxId = 0;
    this.contacts.forEach(contact => {
      if (!contact || !contact.id) return;
      const currentId = +contact.id;
      if (currentId > maxId) maxId = currentId;
    });
    return (maxId + 1).toString();
  }
  storeContacts() {
    const contactsString = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(this.contactsUrl, contactsString, { headers })
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
