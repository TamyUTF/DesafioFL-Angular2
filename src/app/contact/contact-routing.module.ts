import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContactComponent } from './contact.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { ContactFormComponent } from './contact-form/contact-form.component';

const contactRoutes = [
  { path: '', component: ContactComponent, children: [
    { path: 'contact/new', component: ContactFormComponent},
    { path: 'contact/:id/edit', component: ContactFormComponent},
    { path: 'contact/:id', component: ContactInfoComponent}
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(contactRoutes)
  ],
  exports: [RouterModule]
})

export class ContactRoutingModule {}
