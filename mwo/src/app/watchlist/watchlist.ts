import { Component, OnInit } from '@angular/core';

import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-watchlist',
  standalone: false,
  templateUrl: './watchlist.html',
  styleUrl: './watchlist.css',
})

export class Watchlist implements OnInit {

  constructor(private dataStorage: DataStorageService) {}

  ngOnInit() {
    }

}
