import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MaterialModule } from './material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FavoriteComponent } from './favorite/favorite.component';
import { AppRoutingModule } from './app.routing.module';
import { ContactModule } from './contact/contact.module';
import { ContactRoutingModule } from './contact/contact-routing.module';
import { ContactService } from './services/contact.service';
import { PagerService } from './services/pager.service';
import { MyDialogComponent } from './services/my-dialog/my-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    FavoriteComponent,
    MyDialogComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    ContactModule,
    HttpClientModule,
    ContactRoutingModule,
    AppRoutingModule
  ],
  entryComponents: [MyDialogComponent],
  providers: [ContactService, PagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
