import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})

export class DocumentService {
  documents: Document[] = [];
  documentsChanged = new Subject<Document[]>();
  error = new Subject<string>();

  private documentsUrl = 'http://localhost:3000/documents';

  constructor(private http: HttpClient) {}

  private sortAndSend() {
    this.documents.sort((a, b) => {
      const nameA = a.name || '';
      const nameB = b.name || '';
      return nameA.localeCompare(nameB);
    });
    this.documentsChanged.next(this.documents.slice());
  }
  getDocuments() {
    return this.documents.slice();
  }
  getDocument(index: number) {
    return this.documents[index];
  }
  addDocument(document: Document, callback?: () => void) {
    if (!document) return;
    if (!document.id) document.id = this.getMaxId();
    const payload = {
      id: document.id,
      name: document.name,
      url: document.url,
      description: document.description ?? null,
      children: document.children ?? []
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<Document>(this.documentsUrl, payload, { headers })
      .subscribe({
        next: (addedDocument) => {
          console.log('[DEBUG] Backend returned document:', addedDocument);
          if (!addedDocument || !addedDocument.id) {
            console.error('Invalid document returned from server:', addedDocument);
            this.error.next('Failed to add document: invalid server response.');
            return;
          }
          this.documents.push(addedDocument);
          this.sortAndSend();
          if (callback) callback();
        },
        error: (err) => {
          console.error('Error adding document:', err);
          this.error.next('Failed to add document on server.');
        }
      });
  }


  // updateDocument(index: number, newDocument: Document) {
  //   this.documents[index] = newDocument;
  //   this.storeDocuments();
  // }
  updateDocument(originalDocument: Document, newDocument: Document, callback?: () => void) {
    if (!originalDocument || !newDocument) return;

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);
    if (pos < 0) return;

    newDocument.id = originalDocument.id;
    newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(`${this.documentsUrl}/${originalDocument.id}`, newDocument, { headers })
      .subscribe({
        next: () => {
          this.documents[pos] = newDocument;
          this.sortAndSend();
          if (callback) callback();
        },
        error: (err) => {
          console.error('Error updating document:', err);
          this.error.next('Failed to update document on server.');
        }
      });
  }
  deleteDocument(document: Document, callback?: () => void) {
    if (!document) return;
    const pos = this.documents.findIndex(d => d.id === document.id);
    if (pos < 0) return;
    this.http.delete(`${this.documentsUrl}/${document.id}`)
      .subscribe({
        next: () => {
          this.documents.splice(pos, 1);
          this.sortAndSend();
          if (callback) callback();
        },
        error: (err) => {
          console.error('Error deleting document:', err);
          this.error.next('Failed to delete document on server.');
        }
      });
  }
  getMaxId(): string {
    let maxId = 0;
    this.documents.forEach(document => {
      if (!document || !document.id) return;
      const currentId = +document.id;
      if (currentId > maxId) maxId = currentId;
    });
    return (maxId + 1).toString();
  }

  storeDocuments() {
    const documentsString = JSON.stringify(this.documents);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(this.documentsUrl, documentsString, { headers })
      .subscribe({
        next: () => {
          this.documentsChanged.next(this.documents.slice());
        },
        error: (err) => {
          console.error('Error storing documents:', err);
          this.error.next('Failed to store documents on the server.');
        }
      });
  }
  setDocuments(documents: Document[]) {
    this.documents = documents;
    this.documentsChanged.next(this.documents.slice());
  }
}
