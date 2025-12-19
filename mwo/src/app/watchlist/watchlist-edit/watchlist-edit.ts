import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  watchlistForm: FormGroup;
  // watchlistForm: FormGroup = new FormGroup({});
  originalMovie: Watchlist;
  // genres: [[]]
  successMessage: string | null = null;
  genresList: string[] = [
    'action',
    'adventure',
    'animation',
    'art-house',
    'comedy',
    'crime',
    'drama',
    'family',
    'fantasy',
    'found-footage',
    'heist',
    'horror',
    'indie',
    'musical',
    'mystery',
    'psychological',
    'romance',
    'sci-fi',
    'spy',
    'superhero',
    'thriller'
  ];


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
    if (this.watchlistForm.invalid) return;

    const formValue = this.watchlistForm.value;

    if (this.editMode) {
      const updatedMovie: Watchlist = {
        ...this.originalMovie,       // keep id and anything not in form
        ...formValue                 // overwrite with form edits
      };
      this.watchlistService.updateMovie(updatedMovie).subscribe({
        next: () => {
          const index = this.watchlistService.movies.findIndex(m => m.id === updatedMovie.id);
          if (index > -1) this.watchlistService.movies[index] = updatedMovie;
          this.watchlistService.watchlistChanged.next(this.watchlistService.movies.slice());
          this.router.navigate(['/watchlist', updatedMovie.id]);
        },
        error: err => console.error(err)
      });
    } else {
      // NEW MOVIE
      this.watchlistService.addMovie(formValue).subscribe({
        next: addedMovie => {
          this.watchlistService.movies.push(addedMovie);
          this.watchlistService.watchlistChanged.next(this.watchlistService.movies.slice());
          this.router.navigate(['/watchlist', addedMovie.id]);
        },
        error: err => console.error(err)
      });
    }
  }
  // onSubmit() {
  //   const title = this.watchlistForm.value.title?.trim();
  //   const year = this.watchlistForm.value.year ? +this.watchlistForm.value.year : undefined;
  //   const type = this.watchlistForm.value.type || 'movie';
  //   const genres = this.watchlistForm.value.genres || [];
  //   const status = this.watchlistForm.value.status || 'planned';
  //   const watched = this.watchlistForm.value.watched || false;
  //   const favorite = this.watchlistForm.value.favorite || false;
  //   const rating = this.watchlistForm.value.rating || null;
  //   const notes = this.watchlistForm.value.notes || '';
  //   if (!title || !year || !genres) {
  //     console.error('Movie title, year, and genres are required.');
  //     return;
  //   }
  //   const newMovie: Watchlist = new Watchlist(
  //     this.watchlistService.getMaxId(),
  //     title,
  //     year,
  //     type,
  //     genres,
  //     status,
  //     watched,
  //     favorite,
  //     rating,
  //     notes
  //   );
  //   this.watchlistService.addMovie(newMovie, () => {
  //     console.log('[DEBUG] Movie added callback:', newMovie);
  //     console.log('[DEBUG] All movies now:', this.watchlistService.getMovies());
  //     this.watchlistForm.reset();
  //     this.router.navigate(['/watchlist']);
  //   });
  // }

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
      const movie = this.watchlistService.getMovieById(this.id);
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
      year: new FormControl(year, Validators.required),
      type: new FormControl(type),
      genres: new FormControl(genres, Validators.required),
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

  toggleGenre(genre: string) {
    const genres = (this.watchlistForm.value.genres || []) as string[];
    if (genres.includes(genre)) {
      this.watchlistForm.patchValue({
        genres: genres.filter(g => g !== genre)
      });
    } else {
      this.watchlistForm.patchValue({
        genres: [...genres, genre]
      });
    }
  }

  hasGenre(genre: string): boolean {
    return this.watchlistForm.value.genres?.includes(genre);
  }

  get titleControl() {
    return this.watchlistForm.get('title');
  }
  get yearControl() {
    return this.watchlistForm.get('year');
  }
  get typeControl() {
    return this.watchlistForm.get('type');
  }
  get genresControl() {
    return this.watchlistForm.get('genres');
  }
  get statusControl() {
    return this.watchlistForm.get('status');
  }
  get watchedControl() {
    return this.watchlistForm.get('watched');
  }
  get favoriteControl() {
    return this.watchlistForm.get('favorite');
  }
  get ratingControl() {
    return this.watchlistForm.get('rating');
  }
  get notesControl() {
    return this.watchlistForm.get('notes');
  }
}