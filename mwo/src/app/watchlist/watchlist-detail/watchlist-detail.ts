import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Watchlist } from '../watchlist.model';
import { WatchlistService } from '../watchlist.service';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'app-watchlist-detail',
  standalone: false,
  templateUrl: './watchlist-detail.html',
  styleUrl: './watchlist-detail.css'
})

export class WatchlistDetail implements OnInit {
  movie: Watchlist;
  id: number;
  nativeWindow: any;

  constructor(private watchlistService: WatchlistService, 
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
          this.movie = this.watchlistService.getMovie(this.id);
    });
  }
  // onView() {
  //   if (this.movie.url) {
  //     this.nativeWindow.open(this.movie.url);
  //     console.log('movie opened in new window');
  //   }
  // }
  onEditDocument() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
  onDeleteDocument() {
    if (!document) return;
    this.watchlistService.deleteMovie(this.movie, () => {
      this.router.navigate(['/documents']);
    });
  }
}
