import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { NgForm } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.html',
  styleUrl: './contact-edit.css'
})

export class ContactEdit implements OnInit {
  id: string;
  originalContact: Contact;
  contact: Contact;
  contacts: Contact[] = [];
  groupContacts: Contact[] = [];
  editMode: boolean = false;

  constructor(private route: ActivatedRoute,
              private contactService: ContactService,
              private router: Router
  ) {} 

  ngOnInit() {
    // this.contacts = this.contactService.getContacts();
    // this.contacts = this.contactService.contacts;
    this.contactService.groupContacts$.subscribe(
      group => this.groupContacts = group
    );
    this.route.params
      .subscribe(
          (params: Params) => {
            this.id = params['id'];
            if (this.id == null) {
              this.editMode = false;
              return;
            }
            this.originalContact = this.contactService.getContact(this.id);
            if (this.originalContact == null) {
              return;
            }
            this.editMode = true;
            this.contact = JSON.parse(JSON.stringify(this.originalContact));
            this.editMode = params['id'] != null;
            if (this.contact.group != null) {
              this.groupContacts = JSON.parse(JSON.stringify(this.contact.group));
            }
          }
        );
  }
  onSubmit(form: NgForm) {  
    const value = form.value;
    const newContact = new Contact('', value.name, value.email, value.phone, value.imageUrl, value.groupContacts);
    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
  }
  onCancel() {
    this.router.navigate(['/contacts']);
  }
  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }
  addToGroup($event: any) {
    const selectedContact: Contact = $event.item.data;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);
  }
  // onRemoveItem(index: number) {
  //   if (index < 0 || index >= this.groupContacts.length) {
  //     return;
  //   }
  //   this.groupContacts.splice(index, 1);
  // }
  onRemoveItem(contact: Contact) {
    this.contactService.removeFromGroup(contact);
  }

  drop(event: CdkDragDrop<Contact[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      // const draggedItem = event.previousContainer.data[event.previousIndex];
      // if (!this.isInvalidContact(draggedItem)) {
      //   this.groupContacts.splice(event.currentIndex, 0, draggedItem);
      // }
    }
  }
  // onDropToGroup(event: CdkDragDrop<Contact[]>) {
  //   const contact: Contact = event.item.data;
  //   this.contactService.addToGroup(contact);
  // }
}
