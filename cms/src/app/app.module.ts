import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { App } from './app.component';

import { Header } from './header';
import { Contacts } from './contacts/contacts';
import { ContactList } from './contacts/contact-list/contact-list';
import { ContactDetail } from './contacts/contact-detail/contact-detail';
import { ContactItem } from './contacts/contact-item/contact-item';
import { Documents } from './documents/documents';
import { DocumentList } from './documents/document-list/document-list';
import { DocumentItem } from './documents/document-item/document-item';
import { DocumentDetail } from './documents/document-detail/document-detail';
import { Messages } from './messages/messages';
import { MessageDetail } from './messages/message-detail/message-detail';
import { MessageList } from './messages/message-list/message-list';
import { MessageItem } from './messages/message-item/message-item';
import { MessageEdit } from './messages/message-edit/message-edit';
import { DropdownDirective } from './shared/dropdown.directive';
import { ContactService } from './contacts/contact.service';
import { AppRoutingModule } from './app-routing.module';
import { DocumentEdit } from './documents/document-edit/document-edit';
import { DocumentStart } from './documents/document-start/document-start';
import { ContactStart } from './contacts/contact-start/contact-start';
import { ContactEdit } from './contacts/contact-edit/contact-edit';

@NgModule({
  declarations: [
    App,
    Header,
    Contacts,
    ContactList,
    ContactDetail,
    ContactItem,
    Documents,
    DocumentList,
    DocumentItem,
    DocumentDetail,
    Messages,
    MessageDetail,
    MessageList,
    MessageItem,
    MessageEdit,
    DocumentEdit,
    DocumentStart,
    ContactStart,
    ContactEdit
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DropdownDirective,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    ContactService
  ],
  bootstrap: [App]
})
export class AppModule { }
