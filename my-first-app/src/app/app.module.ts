import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { App } from './app.component';
import { Server } from './server/server.component';
import { Servers } from './servers/servers';
import { WarningAlert } from './warning-alert/warning-alert';
import { SuccessAlert } from './success-alert/success-alert';
import { ContactItem } from './contact-item/contact-item';

@NgModule({
  declarations: [
    App,
    Server,
    Servers,
    WarningAlert,
    SuccessAlert,
    ContactItem
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection()
  ],
  bootstrap: [App]
})
export class AppModule { }
