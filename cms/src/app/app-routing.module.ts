import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Messages } from './messages/messages';
import { Documents } from './documents/documents';
import { DocumentStart } from './documents/document-start/document-start';
import { DocumentDetail } from './documents/document-detail/document-detail';
import { DocumentEdit } from './documents/document-edit/document-edit';
import { Contacts } from './contacts/contacts';
import { ContactStart } from './contacts/contact-start/contact-start';
import { ContactDetail } from './contacts/contact-detail/contact-detail';
import { ContactEdit } from './contacts/contact-edit/contact-edit';

const appRoutes: Routes = [
    {path: '', redirectTo: '/messages', pathMatch: 'full'},
    {path: 'documents', component: Documents, children: [
      {path: '', component: DocumentStart},
      {path: 'new', component: DocumentEdit},
      {path: ':id', component: DocumentDetail},
      {path: ':id/edit', component: DocumentEdit}
    ]},
    {path: 'messages', component: Messages},
    {path: 'contacts', component: Contacts, children: [
      {path: '', component: ContactStart},
      {path: 'new', component: ContactEdit},
      {path: ':id', component: ContactDetail},
      {path: ':id/edit', component: ContactEdit}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
