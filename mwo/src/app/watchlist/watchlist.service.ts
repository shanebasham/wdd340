import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Watchlist } from './watchlist.model';

@Injectable({
  providedIn: 'root'
})

export class WatchlistService {
  movies: Watchlist[] = [];
  watchlistChanged = new Subject<Watchlist[]>();
  error = new Subject<string>();

  private watchlistUrl = 'http://localhost:3000/watchlist';

  constructor(private http: HttpClient) {}

  private sortAndSend() {
    this.movies.sort((a, b) => {
      const titleA = a.title || '';
      const titleB = b.title || '';
      return titleA.localeCompare(titleB);
    });
    this.watchlistChanged.next(this.movies.slice());
  }
  getMovies() {
    return this.movies.slice();
  }
  getMovie(index: number) {
    return this.movies[index];
  }
  getMovieById(id: number) {
    return this.movies.find(m => +m.id === id);
  }
  addMovie(movie: Watchlist) {
    return this.http.post<any>(this.watchlistUrl, movie);
  }
  updateMovie(movie: Watchlist) {
    return this.http.put<Watchlist>(`${this.watchlistUrl}/${movie.id}`, movie);
  }
  deleteMovie(movie: Watchlist, callback?: () => void) {
    if (!movie) return;
    const pos = this.movies.findIndex(m => m.id === movie.id);
    if (pos < 0) return;
    this.http.delete(`${this.watchlistUrl}/${movie.id}`)
      .subscribe({
        next: () => {
          this.movies.splice(pos, 1);
          this.sortAndSend();
          if (callback) callback();
        },
        error: (err) => {
          console.error('Error deleting movie:', err);
          this.error.next('Failed to delete movie on server.');
        }
      });
  }
  getMaxId(): string {
    let maxId = 0;
    this.movies.forEach(movie => {
      if (!movie || !movie._id) return;
      const currentId = +movie.id;
      if (currentId > maxId) maxId = currentId;
    });
    return (maxId + 1).toString();
  }

  storeMovies() {
    const moviesString = JSON.stringify(this.movies);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(this.watchlistUrl, moviesString, { headers })
      .subscribe({
        next: () => {
          this.watchlistChanged.next(this.movies.slice());
          },
        error: (err) => {
          console.error('Error storing movies:', err);
          this.error.next('Failed to store movies on the server.');
        }
      });
  }

  setMovies(movies: Watchlist[]) {
    this.movies = movies;
    this.watchlistChanged.next(this.movies.slice());
  }
}