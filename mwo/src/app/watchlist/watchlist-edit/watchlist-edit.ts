import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { Watchlist } from '../watchlist.model';
import { WatchlistService } from '../watchlist.service';

@Component({
  selector: 'app-watchlist-edit',
  standalone: false,
  templateUrl: './watchlist-edit.html',
  styleUrl: './watchlist-edit.css'
})

export class WatchlistEdit implements OnInit {
  id: number;
  editMode = false;
  watchlistForm: FormGroup
  originalMovie: Watchlist;

  constructor(
    private route: ActivatedRoute,
    private watchlistService: WatchlistService,
    private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
    });
  }

  onSubmit() {
    const title = this.watchlistForm.value.title?.trim();
    const year = this.watchlistForm.value.year ? +this.watchlistForm.value.year : undefined;
    const type = this.watchlistForm.value.type || 'movie';
    const genres = this.watchlistForm.value.genres || [];
    const status = this.watchlistForm.value.status || 'planned';
    const watched = this.watchlistForm.value.watched || false;
    const favorite = this.watchlistForm.value.favorite || false;
    const rating = this.watchlistForm.value.rating || null;
    const notes = this.watchlistForm.value.notes || '';

    if (!title) {
      console.error('Movie title is required.');
      return;
    }

    const newMovie: Watchlist = new Watchlist(
      this.watchlistService.getMaxId(),
      title,
      year,
      type,
      genres,
      status,
      watched,
      favorite,
      rating,
      notes
    );

    this.watchlistService.addMovie(newMovie, () => {
      console.log('[DEBUG] Movie added callback:', newMovie);
      console.log('[DEBUG] All movies now:', this.watchlistService.getMovies());
      this.watchlistForm.reset();
      this.router.navigate(['/watchlist']);
    });
  }

  private initForm() {
    let title = '';
    let year: number | undefined;
    let type = 'movie';
    let genres: string[] = [];
    let status = 'planned';
    let watched = false;
    let favorite = false;
    let rating: number | null = null;
    let notes = '';

    if (this.editMode) {
      const movie = this.watchlistService.getMovie(this.id);
      if (!movie) return;
      this.originalMovie = movie;
      title = movie.title;
      year = movie.year;
      type = movie.type;
      genres = movie.genres;
      status = movie.status;
      watched = movie.watched;
      favorite = movie.favorite;
      rating = movie.rating;
      notes = movie.notes;
    }

    this.watchlistForm = new FormGroup({
      title: new FormControl(title, Validators.required),
      year: new FormControl(year),
      type: new FormControl(type),
      genres: new FormControl(genres),
      status: new FormControl(status),
      watched: new FormControl(watched),
      favorite: new FormControl(favorite),
      rating: new FormControl(rating),
      notes: new FormControl(notes)
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  get titleControl() {
    return this.watchlistForm.get('title');
  }
  get yearControl() {
    return this.watchlistForm.get('year');
  }
  get statusControl() {
    return this.watchlistForm.get('status');
  }
  get notesControl() {
    return this.watchlistForm.get('notes');
  }
}