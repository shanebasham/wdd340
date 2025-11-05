import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  // styleUrl: './header.css'
  styles: `
    ul {
      list-style: none;
    }
    li {
      margin: 15px;

    }`
    })

export class Header {
  collapsed = true;

  constructor() {}
}
