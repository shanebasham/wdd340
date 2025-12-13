import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Documents } from './documents/documents';
import { DocumentStart } from './documents/document-start/document-start';
import { DocumentDetail } from './documents/document-detail/document-detail';
import { DocumentEdit } from './documents/document-edit/document-edit';
import { Messages } from './messages/messages';
import { MessageDetail } from './messages/message-detail/message-detail';
import { MessageEdit } from './messages/message-edit/message-edit';
import { Contacts } from './contacts/contacts';
import { ContactStart } from './contacts/contact-start/contact-start';
import { ContactDetail } from './contacts/contact-detail/contact-detail';
import { ContactEdit } from './contacts/contact-edit/contact-edit';


const appRoutes: Routes = [
    {path: '', redirectTo: '/documents', pathMatch: 'full'},
    {path: 'documents', component: Documents, children: [
      {path: '', component: DocumentStart},
      {path: 'new', component: DocumentEdit},
      {path: ':id', component: DocumentDetail},
      {path: ':id/edit', component: DocumentEdit}
    ]},
    {path: 'messages', component: Messages, children: [
      {path: 'new', component: MessageEdit},
      {path: ':id', component: MessageDetail},
      {path: ':id/edit', component: MessageEdit}
    ]},
    {path: 'contacts', component: Contacts, children: [
      {path: '', component: ContactStart},
      {path: 'new', component: ContactEdit},
      {path: ':id', component: ContactDetail},
      {path: ':id/edit', component: ContactEdit}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
