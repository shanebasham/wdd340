import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'app-document-detail',
  standalone: false,
  templateUrl: './document-detail.html',
  styleUrl: './document-detail.css'
})

export class DocumentDetail implements OnInit {
  document: Document;
  id: number;
  nativeWindow: any;

  constructor(private documentService: DocumentService, 
              private route: ActivatedRoute,
              private router: Router,
              private windowRefService: WindRefService) {
    this.nativeWindow = this.windowRefService.getNativeWindow();
    }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.document = this.documentService.getDocument(this.id);
    });
  }
  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
      console.log('document opened in new window');
    }
  }
  onEditDocument() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['/documents', this.id, 'edit']), {relativeTo: this.route};
  }
  onDeleteDocument() {
    this.documentService.deleteDocument(this.id);
    this.router.navigate(['/documents']);
  }
}
