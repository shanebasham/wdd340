import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-detail',
  standalone: false,
  templateUrl: './contact-detail.html',
  styleUrl: './contact-detail.css'
})
export class ContactDetail {
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
