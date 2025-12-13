import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-edit',
  standalone: false,
  templateUrl: './document-edit.html',
  styleUrl: './document-edit.css'
})

export class DocumentEdit implements OnInit {
  id: number;
  editMode = false;
  documentForm: FormGroup
  originalDocument: Document;

  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService,
    private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
    });
  }

  onSubmit() {
    const name = this.documentForm.value.name?.trim();
    const url = this.documentForm.value.url?.trim();
    const description = this.documentForm.value.description?.trim() || null;
    if (!name || !url) {
      console.error('Document name and URL are required.');
      return;
    }
    const newDocument: Document = new Document(
      this.documentService.getMaxId(),
      name,
      url,
      description,
      []
    );
    this.documentService.addDocument(newDocument, () => {
      console.log('[DEBUG] Document added callback:', newDocument);
      console.log('[DEBUG] All documents now:', this.documentService.getDocuments());
      this.documentForm.reset();
      this.router.navigate(['/documents']);
    });
  }
  private initForm() {
    let name = '';
    let url = '';
    let description = '';

    if (this.editMode) {
      const doc = this.documentService.getDocument(this.id);
      if (!doc) return;
      this.originalDocument = doc;
      name = doc.name;
      url = doc.url;
      description = doc.description;
    }

    this.documentForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      url: new FormControl(url, Validators.required),
      description: new FormControl(description, Validators.required)
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  // private initForm() {
  //   let documentName = '';
  //   let documentUrl = '';
  //   let documentDescription = '';

  //   if (this.editMode) {
  //     const document = this.documentService.getDocument(this.id);
  //     documentName = document.name;
  //     documentUrl = document.url;
  //     documentDescription = document.description;
  //   }

  //   this.documentForm = new FormGroup({
  //     name: new FormControl(documentName, Validators.required),
  //     url: new FormControl(documentUrl, Validators.required),
  //     description: new FormControl(documentDescription, Validators.required)
  //   });
  // }
  get name() {
    return this.documentForm.get('name');
  }
  get description() {
    return this.documentForm.get('description');
  }
  get url() {
    return this.documentForm.get('url');
  }
}
