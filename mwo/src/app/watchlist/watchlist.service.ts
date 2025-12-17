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
  addMovie(movie: Watchlist, callback?: () => void) {
    if (!movie) return;
    if (!movie._id) movie._id = this.getMaxId();
    const payload = { ...movie };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<Watchlist>(this.watchlistUrl, payload, { headers }).subscribe({
      next: (addedMovie) => {
        console.log('[DEBUG] Backend returned movie:', addedMovie);
        if (!addedMovie || !addedMovie._id) {
          console.error('Invalid movie returned from server:', addedMovie);
          this.error.next('Failed to add movie: invalid server response.');
          return;
        }
        this.movies.push(addedMovie);
        this.sortAndSend();
        if (callback) callback();
      },
      error: (err) => {
        console.error('Error adding movie:', err);
        this.error.next('Failed to add movie on server.');
      }
    });
  }

  updateMovie(originalMovie: Watchlist, newMovie: Watchlist, callback?: () => void) {
    if (!originalMovie || !newMovie) return;

    const pos = this.movies.findIndex(m => m._id === originalMovie._id);
    if (pos < 0) return;

    newMovie._id = originalMovie._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(`${this.watchlistUrl}/${originalMovie._id}`, newMovie, { headers }).subscribe({
      next: () => {
        this.movies[pos] = newMovie;
        this.sortAndSend();
        if (callback) callback();
      },
      error: (err) => {
        console.error('Error updating movie:', err);
        this.error.next('Failed to update movie on server.');
      }
    });
  }

  deleteMovie(movie: Watchlist, callback?: () => void) {
    if (!movie) return;
    const pos = this.movies.findIndex(m => m._id === movie._id);
    if (pos < 0) return;

    this.http.delete(`${this.watchlistUrl}/${movie._id}`).subscribe({
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
      const currentId = +movie._id;
      if (currentId > maxId) maxId = currentId;
    });
    return (maxId + 1).toString();
  }

  storeMovies() {
    const moviesString = JSON.stringify(this.movies);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(this.watchlistUrl, moviesString, { headers }).subscribe({
      next: () => this.watchlistChanged.next(this.movies.slice()),
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