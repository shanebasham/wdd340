import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';

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
import { DocumentService } from './documents/document.service';
import { MessageService } from './messages/message.service';
import { AppRoutingModule } from './app-routing.module';
import { DocumentEdit } from './documents/document-edit/document-edit';
import { DocumentStart } from './documents/document-start/document-start';
import { ContactStart } from './contacts/contact-start/contact-start';
import { ContactEdit } from './contacts/contact-edit/contact-edit';
import { ContactsFilterPipe } from './contacts/contacts-filter-pipe';


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
    ContactEdit,
    ContactsFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownDirective,
    AppRoutingModule,
    CdkDropList,
    CdkDrag,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    ContactService,
    DocumentService,
    MessageService
  ],
  bootstrap: [App]
})
export class AppModule { }
