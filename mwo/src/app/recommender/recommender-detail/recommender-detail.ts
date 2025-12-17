import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recommender } from '../recommender.model';
import { RecommenderService } from '../recommender.service';

@Component({
  selector: 'app-recommender-detail',
  standalone: false,
  templateUrl: './recommender-detail.html',
  styleUrl: './recommender-detail.css'
})

export class RecommenderDetail implements OnInit{
  contact: Recommender;
  id: string;
  isDropdownOpen = false;

  constructor(private contactService: RecommenderService,
              private route: ActivatedRoute,
              private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log("Opening contact ID:", this.id);
      this.contact = this.contactService.getRecommender(this.id);
    });
  }
  
  onEditContact() {
    // this.router.navigate(['/contacts', this.id, 'edit']);
    this.router.navigate(['/contacts'], {relativeTo: this.route});
  }
  onDeleteContact() {
    if (!this.contact) return;
    this.contactService.deleteRecommender(this.contact, () => {
      this.router.navigate(['/contacts']);  
    });
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
