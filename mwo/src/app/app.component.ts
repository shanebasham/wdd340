import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})

export class App {
  loadedFeature = 'document';

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

}
