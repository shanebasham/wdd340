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
    this.route.params.subscribe(params => {
      const id = +params['id'];
      console.log('Route param id:', id);
      this.movie = this.watchlistService.getMovieById(id); 
      if (!this.movie) {
        console.log('Movie not found', id);
      } else {
        console.log('Movie loaded:', this.movie);
      }
    });
  }
  // ngOnInit() {
  //   this.route.params
  //     .subscribe((params: Params) => {
  //       const movieId = params['id'];
  //       this.watchlistService.getMovieFromServer(movieId)
  //         .subscribe({
  //           next: (movie) => {
  //             this.movie = movie;
  //           },
  //           error: (err) => {
  //             console.error('Failed to load movie:', err);
  //           }
  //         });
  //   });
  // }
  // onView() {
  //   if (this.movie.url) {
  //     this.nativeWindow.open(this.movie.url);
  //     console.log('movie opened in new window');
  //   }
  // }
  onEditMovie() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
  onDeleteMovie() {
    if (!this.movie) return;
    this.watchlistService.deleteMovie(this.movie, () => {
      this.router.navigate(['/watchlist']).then(() => {
        window.location.reload();
      });
    });
  }
}
