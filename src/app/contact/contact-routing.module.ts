import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContactComponent } from './contact.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { ContactFormComponent } from './contact-form/contact-form.component';

const contactRoutes = [
  { path: 'contact', component: ContactComponent, children: [
    { path: ':id', component: ContactInfoComponent},
    { path: ':id/edit', component: ContactFormComponent}
  ]}
];

@NgModule({
  imports:[
    RouterModule.forChild(contactRoutes)
  ],
  exports:[]
})

export class ContactRoutingModule {}
