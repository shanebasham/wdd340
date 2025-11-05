import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-document-edit',
  standalone: false,
  templateUrl: './document-edit.html',
  styleUrl: './document-edit.css'
})
export class DocumentEdit implements OnInit {
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
