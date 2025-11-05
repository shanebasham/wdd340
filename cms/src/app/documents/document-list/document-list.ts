import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  standalone: false,
  templateUrl: './document-list.html',
  styleUrl: './document-list.css'
})

export class DocumentList implements OnInit {
  documents: Document[];

  constructor(private documentService: DocumentService,
              private router: Router,
              private route: ActivatedRoute) 
  {
    this.documents = this.documentService.getDocuments();
  }

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
    this.documentService.documentChangedEvent
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
        }
      );
  }

  onNewDocument() {
    // this.router.navigate(['new'], {relativeTo: this.route});
    this.router.navigate(['/documents', 'new'], {relativeTo: this.route});
  }
}