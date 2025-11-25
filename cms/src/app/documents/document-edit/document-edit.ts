import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-document-edit',
  standalone: false,
  templateUrl: './document-edit.html',
  styleUrl: './document-edit.css'
})

export class DocumentEdit implements OnInit {
  id: string;
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor(private route: ActivatedRoute,
              private documentService: DocumentService,
              private router: Router) {}

  ngOnInit() {
    this.route.params
      .subscribe(
          (params: Params) => {
            this.id = params['id'];
            if (this.id == null) {
              this.editMode = false;
              return;
            }
            this.originalDocument = this.documentService.getDocument(this.id);
            if (this.originalDocument == null) {
              return;
            }
            this.editMode = true;
            this.document = JSON.parse(JSON.stringify(this.originalDocument));
            this.editMode = params['id'] != null;
          }
        ); 
  }
  onSubmit(form: NgForm) {
    const value = form.value;
    const newDocument = new Document('', value.name, value.description, value.url);
    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(['/documents']);
  }
  onCancel() {
    this.router.navigate(['/documents']);
  }
}
