import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http'

import {Recommender} from './recommender.model';

@Injectable({
  providedIn: 'root'
})

export class RecommenderService {
  contacts: Recommender[] = [];
  // contactSelectedEvent = new Subject<Contact>();
  // contactChangedEvent = new Subject<Contact[]>();
  // contactListChangedEvent = new Subject<Contact[]>();
  contactsChanged = new Subject<Recommender[]>();
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
  getRecommenders() {
    return this.contacts.slice();
  }
  getRecommender(id: string) {
    return this.contacts.find(c => c.id?.toString() === id.toString());
  }
  // addContact(contact: Contact) {
  //   this.contacts.push(contact);
  //   this.storeContacts();
  // }
  addRecommender(contact: Recommender, callback?: () => void) {
    if (!contact) return;
    if (!contact.id) contact.id = this.getMaxId();

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<Recommender>(this.contactsUrl, contact,  { headers })
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
  updateRecommender(originalContact: Recommender, newContact: Recommender, callback?: () => void) {
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
  deleteRecommender(contact: Recommender, callback?: () => void) {
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

  getMaxId(): string {
    let maxId = 0;
    this.contacts.forEach(contact => {
      if (!contact || !contact.id) return;
      const currentId = +contact.id;
      if (currentId > maxId) maxId = currentId;
    });
    return (maxId + 1).toString();
  }
  storeRecommender() {
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
  setRecommenders(contacts: Recommender[]) {
    this.contacts = contacts;
    this.contactsChanged.next(this.contacts.slice());
  }
}
