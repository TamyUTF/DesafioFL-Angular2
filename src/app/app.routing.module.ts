import { ContactFormComponent } from './contact/contact-form/contact-form.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { FavoriteComponent } from './favorite/favorite.component';
import { ContactComponent } from './contact/contact.component';

const appRoutes: Routes = [
    { path: '', component: ContactComponent},
    { path: 'favorites', component: FavoriteComponent},
    { path: 'new', component: ContactFormComponent}
];

@NgModule ({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
