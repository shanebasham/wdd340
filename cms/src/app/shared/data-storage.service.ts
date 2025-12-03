import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Document } from '../documents/document.model';
import { DocumentService } from '../documents/document.service';
import { Contact } from '../contacts/contact.model';
import { ContactService } from '../contacts/contact.service';
import { Message } from '../messages/message.model';
import { MessageService } from '../messages/message.service';

@Injectable({ providedIn: 'root' })

export class DataStorageService {

  constructor(
    private http: HttpClient,
    private documentService: DocumentService,
    private contactService: ContactService,
    private messageService: MessageService) {}

  fetchDocuments(): Observable<Document[]> {
    console.log('FETCHING DOCUMENTS…');
    console.log('Firebase URL:', 'https://cms-project-30759-default-rtdb.firebaseio.com/cms/documents.json');
    return new Observable((observer) => {
        this.http.get<any>('https://cms-project-30759-default-rtdb.firebaseio.com/cms/documents.json').subscribe({
        next: (data) => {
            console.log('RAW RESPONSE FROM FIREBASE:', data);
            console.log('TYPE OF RESPONSE:', typeof data);
            // 1. Firebase returned null (no data or wrong path)
            if (data === null) {
            console.error('FIREBASE RETURNED NULL — NO DATA FOUND.');
            console.warn(`
    Reasons Firebase returns NULL:
    The path is empty: /documents has no children.
    You overwrote the path earlier with PUT and erased the data.
    The URL is incorrect (most common).
    Firebase security rules are blocking reads.
    `);
            this.documentService.setDocuments([]);
            observer.next([]);
            observer.complete();
            return;
            }
            // 2. Firebase returned a non-object (bad data)
            if (typeof data !== 'object') {
            console.error('FIREBASE RETURNED NON-OBJECT DATA:', data);
            this.documentService.setDocuments([]);
            observer.next([]);
            observer.complete();
            return;
            }
            // 3. Firebase returned an object
            console.log('PARSING DOCUMENT OBJECT…');
            const docs: Document[] = [];
            const keys = Object.keys(data);
            console.log('DOCUMENT KEYS FOUND:', keys);
            if (keys.length === 0) {
            console.warn('The documents node exists but is EMPTY.');
            }
            for (const key of keys) {
            const d = data[key];
            console.log(`PROCESSING DOCUMENT ID: ${key}`, d);
            const doc = new Document(
                d.name || '',
                d.url || '',
                d.description || '',
                Array.isArray(d.children) ? d.children : []
            );

            docs.push(doc);
            }
            console.log('FINAL PARSED DOCUMENT ARRAY:', docs);
            this.documentService.setDocuments(docs);
            observer.next(docs);
            observer.complete();
        },
        error: (err) => {
            console.error('HTTP ERROR WHILE FETCHING DOCUMENTS:', err);
            console.warn(`
    Possible Causes:
    Wrong URL
    Security rules require authentication
    CORS/premissions issue
    Network failure
    `);
            this.documentService.setDocuments([]);
            observer.error(err);
        }
        });
    });
  }
  fetchContacts(): Observable<Contact[]> {
    console.log('FETCHING CONTACTS…');
    console.log('Firebase URL:', 'https://cms-project-30759-default-rtdb.firebaseio.com/cms/contacts.json');
    return new Observable((observer) => {
        this.http.get<any>('https://cms-project-30759-default-rtdb.firebaseio.com/cms/contacts.json').subscribe({
        next: (data) => {
            console.log('RAW RESPONSE FROM FIREBASE:', data);
            console.log('TYPE OF RESPONSE:', typeof data);
            // 1. Firebase returned null (no data or wrong path)
            if (data === null) {
            console.error('FIREBASE RETURNED NULL — NO DATA FOUND.');
            console.warn(`
    Reasons Firebase returns NULL:
    The path is empty: /contacts has no children.
    You overwrote the path earlier with PUT and erased the data.
    The URL is incorrect (most common).
    Firebase security rules are blocking reads.
    `);
            this.contactService.setContacts([]);
            observer.next([]);
            observer.complete();
            return;
            }
            // 2. Firebase returned a non-object (bad data)
            if (typeof data !== 'object') {
            console.error('FIREBASE RETURNED NON-OBJECT DATA:', data);
            this.contactService.setContacts([]);
            observer.next([]);
            observer.complete();
            return;
            }
            // 3. Firebase returned an object
            console.log('PARSING CONTACT OBJECT…');
            const contacts: Contact[] = [];
            const keys = Object.keys(data);
            console.log('CONTACT KEYS FOUND:', keys);
            if (keys.length === 0) {
            console.warn('The contacts node exists but is EMPTY.');
            }
            for (const key of keys) {
            const d = data[key];
            console.log(`PROCESSING CONTACT ID: ${key}`, d);
            const contact = new Contact(
                d.name || '',
                d.email || '',
                d.phone || '',
                d.imageUrl || '',
                Array.isArray(d.group) ? d.group : []
            );
            contact.id = key;
            contacts.push(contact);
            }
            console.log('FINAL PARSED CONTACT ARRAY:', contacts);
            this.contactService.setContacts(contacts);
            observer.next(contacts);
            observer.complete();
        },
        error: (err) => {
            console.error('HTTP ERROR WHILE FETCHING CONTACTS:', err);
            console.warn(`
    Possible Causes:
    Wrong URL
    Security rules require authentication
    CORS/premissions issue
    Network failure
    `);
            this.contactService.setContacts([]);
            observer.error(err);
        }
        });
    });
  }
  fetchMessages(): Observable<Message[]> {
    console.log('FETCHING MESSAGES');
    console.log('Firebase URL:', 'https://cms-project-30759-default-rtdb.firebaseio.com/cms/messages.json');
    return new Observable((observer) => {
        this.http.get<any>('https://cms-project-30759-default-rtdb.firebaseio.com/cms/messages.json').subscribe({
        next: (data) => {
            console.log('RAW RESPONSE FROM FIREBASE:', data);
            console.log('TYPE OF RESPONSE:', typeof data);
            // 1. Firebase returned null (no data or wrong path)
            if (data === null) {
            console.error('FIREBASE RETURNED NULL — NO DATA FOUND.');
            console.warn(`
    Reasons Firebase returns NULL:
    The path is empty: /messages has no children.
    You overwrote the path earlier with PUT and erased the data.
    The URL is incorrect (most common).
    Firebase security rules are blocking reads.
    `);
            this.messageService.setMessages([]);
            observer.next([]);
            observer.complete();
            return;
            }
            // 2. Firebase returned a non-object (bad data)
            if (typeof data !== 'object') {
            console.error('FIREBASE RETURNED NON-OBJECT DATA:', data);
            this.messageService.setMessages([]);
            observer.next([]);
            observer.complete();
            return;
            }
            // 3. Firebase returned an object
            console.log('PARSING MESSAGE OBJECT…');
            const messages: Message[] = [];
            const keys = Object.keys(data);
            console.log('MESSAGE KEYS FOUND:', keys);
            if (keys.length === 0) {
            console.warn('The messages node exists but is EMPTY.');
            }
            for (const key of keys) {
            const d = data[key];
            console.log(`PROCESSING MESSAGE ID: ${key}`, d);
            const message = new Message(
                d.subject || '',
                d.msgText || '',
                d.sender || '',
            );

            messages.push(message);
            }
            console.log('FINAL PARSED MESSAGE ARRAY:', messages);
            this.messageService.setMessages(messages);
            observer.next(messages);
            observer.complete();
        },
        error: (err) => {
            console.error('HTTP ERROR WHILE FETCHING MESSAGES:', err);
            console.warn(`
    Possible Causes:
    Wrong URL
    Security rules require authentication
    CORS/premissions issue
    Network failure
    `);
            this.messageService.setMessages([]);
            observer.error(err);
        }
        });
    });
  }
//   clearDocuments() {
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//     // PUT an empty array to Firebase to overwrite all documents
//     this.http.put(this.firebaseUrl, [], { headers })
//         .subscribe(
//         () => {
//             console.log('All documents cleared successfully.');
//             this.documentService.setDocuments([]); // Reset local document array
//         },
//         (error) => {
//             console.error('Error clearing documents:', error);
//         }
//         );
//     }
}
