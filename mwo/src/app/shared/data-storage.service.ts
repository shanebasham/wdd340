import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { Watchlist } from '../watchlist/watchlist.model';
import { WatchlistService } from '../watchlist/watchlist.service';
import { Recommender } from '../recommender/recommender.model';
import { RecommenderService } from '../recommender/recommender.service';

@Injectable({ providedIn: 'root' })

export class DataStorageService {

  private watchlistUrl = 'http://localhost:3000/watchlist';
  private contactUrl = 'http://localhost:3000/contacts';

  constructor(
    private http: HttpClient,
    private watchlistService: WatchlistService,
    private contactService: RecommenderService
  ) {}

  fetchwatchlist(): Observable<Watchlist[]> {
    return this.http.get<{ message: string; watchlist: Watchlist[] }>(this.watchlistUrl).pipe(
        map(res => res.watchlist),
        tap(movies => this.watchlistService.setMovies(movies)),
        catchError(err => {
        this.watchlistService.setMovies([]);
        return throwError(() => err);
        }),
    catchError(err => {
      this.watchlistService.setMovies([]);
      return throwError(() => err);
    })
    );
  }

  fetchContacts(): Observable<Recommender[]> {
    return this.http.get<Recommender[]>(this.contactUrl).pipe(
        tap((data) => this.contactService.setRecommenders(data)),
        catchError((err) => {
        this.contactService.setRecommenders([]);
        return throwError(() => err);
        })
    );
  }
}
