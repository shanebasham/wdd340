import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

import { Recommender } from '../recommender.model';
import { RecommenderService } from '../recommender.service';
import { DataStorageService } from '../../shared/data-storage.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-recommender-list',
  standalone: false,
  templateUrl: './recommender-list.html',
  styleUrl: './recommender-list.css'
})

export class RecommenderList implements OnInit, OnDestroy {
  contacts: Recommender[] = [];
  subscription: Subscription;
  contacts$!: Observable<Recommender[]>;
  term: string = '';

  constructor(private dataStorageService: DataStorageService,
              private contactService: RecommenderService,
              private router: Router,
              private route: ActivatedRoute,
              private zone: NgZone) {}
  
  ngOnInit() {
    this.contacts$ = this.contactService.contactsChanged.asObservable();
    this.contactService.contactsChanged.next(this.contactService.getRecommenders());
  }

  onNewContact() {
    // this.router.navigate(['new'], {relativeTo: this.route});
    this.router.navigate(['/contacts', 'new'], {relativeTo: this.route});
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  search(value: string) {
    this.term = value;
  }
}
