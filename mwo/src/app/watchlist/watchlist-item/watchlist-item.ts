import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Watchlist } from '../watchlist.model';

@Component({
  selector: 'app-watchlist-item',
  standalone: false,
  templateUrl: './watchlist-item.html',
  styleUrl: './watchlist-item.css'
})

export class WatchlistItem implements OnInit{
  @Input() movie!: Watchlist;
  @Input() index!: number;

  ngOnInit() {
    console.log("Rendering movie item:", this.movie);
  }

}
