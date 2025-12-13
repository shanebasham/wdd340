import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-detail',
  standalone: false,
  templateUrl: './contact-detail.html',
  styleUrl: './contact-detail.css'
})

export class ContactDetail implements OnInit{
  contact: Contact;
  id: string;
  isDropdownOpen = false;

  constructor(private contactService: ContactService,
              private route: ActivatedRoute,
              private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log("Opening contact ID:", this.id);
      this.contact = this.contactService.getContact(this.id);
    });
  }
  
  onEditContact() {
    // this.router.navigate(['/contacts', this.id, 'edit']);
    this.router.navigate(['/contacts'], {relativeTo: this.route});
  }
  onDeleteContact() {
    if (!this.contact) return;
    this.contactService.deleteContact(this.contact, () => {
      this.router.navigate(['/contacts']);  
    });
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
