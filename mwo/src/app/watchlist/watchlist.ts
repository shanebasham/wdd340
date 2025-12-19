import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-watchlist',
  standalone: false,
  templateUrl: './watchlist.html',
  styleUrl: './watchlist.css',
})

export class Watchlist implements OnInit {
  detailOpen = false;

  constructor(
    private dataStorageService: DataStorageService,
    private router: Router
    ) {
    this.router.events.subscribe(() => {
      this.detailOpen = this.router.url.includes('/watchlist/');
    });
  }

  ngOnInit() {
  }

}
