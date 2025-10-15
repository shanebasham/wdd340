import { Component, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  standalone: false,
  templateUrl: './document-list.html',
  styleUrl: './document-list.css'
})

export class DocumentList {
  documents: Document[] = [
    new Document(1, 'Project Plan', 'Project planning document', 'https://example.com/plan.pdf'),
    new Document(2, 'Requirements', 'Requirements specification', 'https://example.com/requirements.pdf'),
    new Document(3, 'Design Doc', 'System design document', 'https://example.com/design.pdf'),
    new Document(4, 'User Guide', 'End user documentation', 'https://example.com/user-guide.pdf'),
    new Document(5, 'Release Notes', 'Release notes for version 1.0', 'https://example.com/release-notes.pdf')
  ];

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}