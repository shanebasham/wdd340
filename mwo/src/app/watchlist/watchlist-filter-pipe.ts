import { Pipe, PipeTransform } from '@angular/core';
import { Watchlist } from './watchlist.model';

@Pipe({
  name: 'watchlistFilter',
  standalone: false
})

export class WatchlistFilterPipe implements PipeTransform {

  transform(movies: Watchlist[], term) { 
    let filteredMovies: Watchlist[] =[];  
    if (term && term.length > 0) {
        filteredMovies = movies.filter(
          (watchlist:Watchlist) => watchlist.title.toLowerCase().includes(term.toLowerCase())
        );
    }
    if (filteredMovies.length < 1){
        return movies;
    }
    return filteredMovies;
  }
}
