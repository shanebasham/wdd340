import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private contactService: ContactService,
              private route: ActivatedRoute,
              private router: Router
  ) {}

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // @Input() contact: Contact;

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.contact = this.contactService.getContact(this.id);
    });
  }
  onEditContact() {
    this.router.navigate(['/contacts', this.id, 'edit']);
  }
  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['/contacts']);  
  }
}
