import { Component } from '@angular/core';

@Component({
  selector: 'app-warning-alert',
  standalone: false,
  templateUrl: './warning-alert.html',
  // styleUrl: './warning-alert.css'
  styles: `
    p {
      color: white;
      background: red;
    }
  `
})
export class WarningAlert {

}
