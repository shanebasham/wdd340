import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-document-list',
  standalone: false,
  templateUrl: './document-list.html',
  styleUrl: './document-list.css'
})

export class DocumentList implements OnInit, OnDestroy {
  documents: Document[] = [];
  subscription: Subscription;
  documents$!: Observable<Document[]>;

  constructor(private dataStorageService: DataStorageService,
              private documentService: DocumentService,
              private router: Router,
              private route: ActivatedRoute,
              private zone: NgZone) {}


  ngOnInit() {
    this.documents$ = this.dataStorageService.fetchDocuments();
    this.documentService.documentsChanged.next(this.documentService.getDocuments());
    console.log('[DEBUG] documentsChanged emitted:', this.documents);
  }

  //   this.dataStorageService.fetchDocuments().subscribe(
  //     (docs) => {
  //       // Ensure Angular change detection runs
  //       this.zone.run(() => {
  //         console.log("Documents fetched on init:", docs);
  //         this.documents = docs;
  //       });
  //     },
  //     (error) => console.error("Error fetching documents on init:", error)
  //   );
  // }
  // ngOnInit() {
  //   this.subscription = this.documentService.documentsChanged
  //     .subscribe(
  //       (documents: Document[]) => {
  //         this.documents = documents;
  //       }
  //     );
  //   this.documents = this.documentService.getDocuments();
  // }


  onNewDocument() {
    // this.router.navigate(['new'], {relativeTo: this.route});
    this.router.navigate(['/documents', 'new'], {relativeTo: this.route});
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

