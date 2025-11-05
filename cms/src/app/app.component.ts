import { Component, signal } from '@angular/core';

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
