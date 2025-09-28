import { Component } from '@angular/core';

@Component({
  selector: 'app-success-alert',
  standalone: false,
  templateUrl: './success-alert.html',
  // styleUrl: './success-alert.css'
  styles: `
    p {
      color: white;
      background: green;
    }
  `
})
export class SuccessAlert {

}
