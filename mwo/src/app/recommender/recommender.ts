import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// import { Recommender } from './recommender.model';
import { RecommenderService } from './recommender.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-recommender',
  standalone: false,
  templateUrl: './recommender.html',
  styleUrl: './recommender.css'
})

export class Recommender implements OnInit {
  selectedContact: Recommender;

  constructor(
    private contactService: RecommenderService,
    private dataStorage: DataStorageService
  ) {}

  ngOnInit() {
    console.log("Contacts component initializing…");
      Promise.all([
        this.dataStorage.fetchContacts().toPromise()
      ])
      .then(() => {
        console.log("Contacts loaded:", this.contactService.getRecommenders());
      })
      .catch(err => console.error("Error loading initial data", err));
    }

}
