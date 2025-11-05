import { Component, OnInit, Input } from '@angular/core';

import { Document } from '../document.model';

@Component({
  selector: 'app-document-item',
  standalone: false,
  templateUrl: './document-item.html',
  styleUrl: './document-item.css'
})

export class DocumentItem implements OnInit{
  @Input() document: Document;
  @Input() index: number;

  ngOnInit() {
  }
}
