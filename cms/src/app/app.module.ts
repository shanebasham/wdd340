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
import { Messsages } from './messsages/messsages';
import { MessageList } from './messsages/message-list/message-list';
import { MessageItem } from './messsages/message-item/message-item';
import { MessageEdit } from './messsages/message-edit/message-edit';
import { DropdownDirective } from './shared/dropdown.directive';

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
    Messsages,
    MessageList,
    MessageItem,
    MessageEdit
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DropdownDirective
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection()
  ],
  bootstrap: [App]
})
export class AppModule { }
