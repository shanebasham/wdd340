import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { DataStorageService } from '../../shared/data-storage.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-contact-list',
  standalone: false,
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css'
})

export class ContactList implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  subscription: Subscription;
  contacts$!: Observable<Contact[]>;
  term: string = '';

  constructor(private dataStorageService: DataStorageService,
              private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute,
              private zone: NgZone) {}
  
  ngOnInit() {
    // this.contacts = this.contactService.getContacts();
    // this.contactService.contactChangedEvent
    //   .subscribe(
    //     (contacts: Contact[]) => {
    //       this.contacts = contacts;
    //     }
    //   );
    // this.subscription = this.contactService.contactListChangedEvent
    //   .subscribe(
    //     (contactsList: Contact[]) => {
    //       this.contacts = contactsList;
    //     }
    //   );
    this.contacts$ = this.contactService.contactsChanged.asObservable();
    this.contactService.contactsChanged.next(this.contactService.getContacts());
  }
  onNewContact() {
    // this.router.navigate(['new'], {relativeTo: this.route});
    this.router.navigate(['/contacts', 'new'], {relativeTo: this.route});
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  // drop(event: CdkDragDrop<Contact[]>) {
  //   const draggedContact: Contact = event.item.data;
  //   this.contactService.addToGroup(draggedContact);
  //   console.log('Dropped contact:', draggedContact);
  // }
  search(value: string) {
    this.term = value;
  }
}
