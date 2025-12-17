import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

import { Watchlist } from '../watchlist.model';
import { WatchlistService } from '../watchlist.service';
import { DataStorageService } from '../../shared/data-storage.service';
import { WatchlistFilterPipe } from '../watchlist-filter-pipe';

@Component({
  selector: 'app-watchlist-list',
  standalone: false,
  templateUrl: './watchlist-list.html',
  styleUrl: './watchlist-list.css'
})

export class WatchlistList implements OnInit, OnDestroy {
  movies: Watchlist[] = [];
  subscription: Subscription;
  movies$!: Observable<Watchlist[]>;
  term: string = '';

  constructor(private dataStorageService: DataStorageService,
              private watchlistService: WatchlistService,
              private router: Router,
              private route: ActivatedRoute,
              private zone: NgZone) {}


ngOnInit() {
  this.movies$ = this.dataStorageService.fetchwatchlist();
  this.movies$.subscribe(movies => {
    console.log('[DEBUG] Movies fetched from backend:', movies);
  });
}

  search(value: string) {
    this.term = value;
  }
  onNewMovie() {
    this.router.navigate(['/watchlist', 'new'], {relativeTo: this.route});
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

