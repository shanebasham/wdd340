import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  standalone: false,
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css'
})

export class ContactList implements OnInit{
  contacts: Contact[] = [];

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute 
  ) {
    this.contacts = this.contactService.getContacts();
  }
  
  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.contactService.contactChangedEvent
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
        }
      );
  }
  onNewContact() {
    // this.router.navigate(['new'], {relativeTo: this.route});
    this.router.navigate(['/contacts', 'new'], {relativeTo: this.route});
  }
}
