import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { Recommender } from '../recommender.model';
import { RecommenderService } from '../recommender.service';
import { CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-recommender-edit',
  standalone: false,
  templateUrl: './recommender-edit.html',
  styleUrl: './recommender-edit.css'
})

export class RecommenderEdit implements OnInit {
  id: string;
  originalContact: Recommender;
  contact: Recommender;
  contacts: Recommender[] = [];
  groupContacts: Recommender[] = [];
  editMode = false;
  contactForm: FormGroup

  constructor(
    private route: ActivatedRoute,
    private contactService: RecommenderService,
    private router: Router) {} 

  ngOnInit() {
      this.route.params.subscribe((params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        if (this.editMode) {
          this.originalContact = this.contactService.getRecommender(this.id);
          this.contact = JSON.parse(JSON.stringify(this.originalContact));
        }
        this.initForm();
      });
  }
  onSubmit() {
    const formValue = this.contactForm.value;
    const newContact = new Recommender(
      this.contact?.id ?? '',
      this.contactForm.value.name,
      this.contactForm.value.email,
      this.contactForm.value.phone,
      this.contactForm.value.imageUrl,
      []
    );
    if (this.editMode) {
      this.contactService.updateRecommender(this.originalContact, newContact, () => {
        this.router.navigate(['/contacts']);
      });
    } else {
      this.contactService.addRecommender(newContact, () => {
        this.router.navigate(['/contacts']);
      });
    }
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
      contactName = this.contact.name;
      contactEmail = this.contact.email;
      contactPhone = this.contact.phone;
      contactImageUrl = this.contact.imageUrl;
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
}
