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

  private firebaseUrl = 'https://cms-project-30759-default-rtdb.firebaseio.com/cms/documents.json';

  constructor(private http: HttpClient) {}

  getDocuments() {
    return this.documents.slice();
  }
  getDocument(index: number) {
    return this.documents[index];
  }
  addDocument(document: Document) {
    this.documents.push(document);
    this.storeDocuments();
  }
  updateDocument(index: number, newDocument: Document) {
    this.documents[index] = newDocument;
    this.storeDocuments();
  }
  deleteDocument(index: number) {
    this.documents.splice(index, 1);
    this.storeDocuments();
  }
  storeDocuments() {
    const documentsString = JSON.stringify(this.documents);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(this.firebaseUrl, documentsString, { headers })
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
