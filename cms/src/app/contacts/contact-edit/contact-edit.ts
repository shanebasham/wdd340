import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.html',
  styleUrl: './contact-edit.css'
})

export class ContactEdit implements OnInit {
  id: number;
  originalContact: Contact;
  contact: Contact;
  contacts: Contact[] = [];
  groupContacts: Contact[] = [];
  editMode = false;
  contactForm: FormGroup

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private router: Router
  ) {} 

  ngOnInit() {
    // this.contacts = this.contactService.getContacts();
    // this.contacts = this.contactService.contacts;
    // this.contactService.groupContacts$.subscribe(
    //   group => this.groupContacts = group
    // );
    // this.route.params
    //   .subscribe(
    //       (params: Params) => {
    //         this.id = params['id'];
    //         if (this.id == null) {
    //           this.editMode = false;
    //           return;
    //         }
    //         this.originalContact = this.contactService.getContact(this.id);
    //         if (this.originalContact == null) {
    //           return;
    //         }
    //         this.editMode = true;
    //         this.contact = JSON.parse(JSON.stringify(this.originalContact));
    //         this.editMode = params['id'] != null;
    //         if (this.contact.group != null) {
    //           this.groupContacts = JSON.parse(JSON.stringify(this.contact.group));
    //         }
    //       }
    //     );
      this.route.params.subscribe((params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      });
  }
  onSubmit() {  
    // const value = form.value;
    // const newContact = new Contact('', value.name, value.email, value.phone, value.imageUrl, value.groupContacts);
    if (this.editMode) {
      this.contactService.updateContact(this.id, this.contactForm.value);
    } else {
      this.contactService.addContact(this.contactForm.value);
    }
    this.onCancel();
  }
  onCancel() {
    this.router.navigate(['/contacts']);
  }
  private initForm() {
    let contactName = '';
    let contactEmail= '';
    let contactPhone= '';
    let contactImageUrl= '';

    if (this.editMode) {
      const contact = this.contactService.getContact(this.id);
      contactName = contact.name;
      contactEmail = contact.email;
      contactPhone = contact.phone;
      contactImageUrl = contact.imageUrl;
    }

    this.contactForm = new FormGroup({
      name: new FormControl(contactName, Validators.required),
      email: new FormControl(contactEmail, Validators.required),
      phone: new FormControl(contactPhone, Validators.required),
      imageUrl: new FormControl(contactImageUrl)
    });
  }
  get name() {
    return this.contactForm.get('name');
  }
  get email() {
    return this.contactForm.get('email');
  }
  get phone() {
    return this.contactForm.get('phone');
  }
  get imageUrl() {
    return this.contactForm.get('imageUrl');
  }
  // isInvalidContact(newContact: Contact) {
  //   if (!newContact) {
  //     return true;
  //   }
  //   if (this.contact && newContact.id === this.contact.id) {
  //     return true;
  //   }
  //   for (let i = 0; i < this.groupContacts.length; i++) {
  //     if (newContact.id === this.groupContacts[i].id) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }
  // addToGroup($event: any) {
  //   const selectedContact: Contact = $event.item.data;
  //   const invalidGroupContact = this.isInvalidContact(selectedContact);
  //   if (invalidGroupContact) {
  //     return;
  //   }
  //   this.groupContacts.push(selectedContact);
  // }
  // onRemoveItem(contact: Contact) {
  //   this.contactService.removeFromGroup(contact);
  // }

  // drop(event: CdkDragDrop<Contact[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     copyArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //   }
  // }
}
