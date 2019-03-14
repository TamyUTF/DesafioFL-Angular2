import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ContactComponent } from './contact.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { MaterialModule } from './../material';
import { ContactRoutingModule } from './contact-routing.module';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ContactRoutingModule,
    FormsModule,
    ReactiveFormsModule
    ],
  declarations: [
    ContactComponent,
    ContactInfoComponent,
    ContactFormComponent,
  ],
  entryComponents: [
  ],
  providers: []
})

export class ContactModule {}
