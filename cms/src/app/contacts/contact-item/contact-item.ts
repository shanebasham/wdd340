import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-item',
  standalone: false,
  templateUrl: './contact-item.html',
  styleUrl: './contact-item.css'
})

export class ContactItem {
  @Input() contact: Contact;
  @Output() selectedContactEvent = new EventEmitter<void>();

  onSelected(contact: Contact) {
    this.selectedContactEvent.emit();
    console.log(contact)
  }
}
