import { Component, Input, OnInit } from '@angular/core';

import { Recommender } from '../recommender.model';

@Component({
  selector: 'app-recommender-item',
  standalone: false,
  templateUrl: './recommender-item.html',
  styleUrl: './recommender-item.css'
})

export class RecommenderItem implements OnInit{
  @Input() contact!: Recommender;
  @Input() index!: number;
  
  ngOnInit() {
    console.log("Rendering contact item:", this.contact);
  }
}
