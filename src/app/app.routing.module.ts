import { ContactFormComponent } from './contact/contact-form/contact-form.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ContactComponent } from './contact/contact.component';

const appRoutes: Routes = [
    { path: '', component: ContactComponent}
];

@NgModule ({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
