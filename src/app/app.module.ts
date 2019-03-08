import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { MaterialMoodule } from './material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FavoriteComponent } from './favorite/favorite.component';
import { FormComponent } from './form/form.component';
import { routing } from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    FavoriteComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    MaterialMoodule,
    BrowserAnimationsModule,
    routing,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
