import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

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
    if (this.editMode) {
      this.documentService.updateDocument(this.id, this.documentForm.value);
    } else {
      this.documentService.addDocument(this.documentForm.value);
    }
    this.onCancel();
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  private initForm() {
    let documentName = '';
    let documentUrl = '';
    let documentDescription = '';

    if (this.editMode) {
      const document = this.documentService.getDocument(this.id);
      documentName = document.name;
      documentUrl = document.url;
      documentDescription = document.description;
    }

    this.documentForm = new FormGroup({
      name: new FormControl(documentName, Validators.required),
      url: new FormControl(documentUrl, Validators.required),
      description: new FormControl(documentDescription, Validators.required)
    });
  }
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
