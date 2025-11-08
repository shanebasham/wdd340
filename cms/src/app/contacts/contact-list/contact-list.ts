import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  standalone: false,
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css'
})

export class ContactList implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  private subscription: Subscription;

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
    this.subscription = this.contactService.contactListChangedEvent
      .subscribe(
        (contactsList: Contact[]) => {
          this.contacts = contactsList;
        }
      );
  }
  onNewContact() {
    // this.router.navigate(['new'], {relativeTo: this.route});
    this.router.navigate(['/contacts', 'new'], {relativeTo: this.route});
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
