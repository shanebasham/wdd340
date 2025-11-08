import { Injectable} from '@angular/core';
import { Subject } from 'rxjs';

import { Document } from './document.model';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})

export class DocumentService {
  documents: Document [] =[];
  documentSelectedEvent = new Subject<Document>();
  documentChangedEvent = new Subject<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }
  getDocument(id: string): Document | null {
    for (const document of this.documents) {
      if (String(document.id) === id) {
        return document;
      }
    }
    return null;
  }
  getMaxId(): number {
    let maxId = 0;  
    for (const document of this.documents) {
      const currentId = parseInt(document.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
  addDocument(document: Document) {
    if (!document) {
        return;
    }
    this.maxDocumentId++;
    document.id = String(this.maxDocumentId);
    this.documents.push(document);
    this.documentChangedEvent.next(this.documents.slice());
  }
  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
        return;
    } 
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
        return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.documentChangedEvent.next(this.documents.slice());
  }
  deleteDocument(document: Document) {
    if (!document) {
        return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
        return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.next(this.documents.slice());
  }
}
