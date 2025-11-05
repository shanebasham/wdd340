import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.html',
  styleUrl: './contact-edit.css'
})
export class ContactEdit implements OnInit {
  id: string;
  editMode = false;

  constructor(private route: ActivatedRoute) {} 

  ngOnInit() {
    this.route.params
      .subscribe(
          (params: Params) => {
            this.id = params['id'];
            this.editMode = params['id'] != null;
          }
        );
  }

}
