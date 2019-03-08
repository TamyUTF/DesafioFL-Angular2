import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { FormComponent } from './form/form.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { ContactComponent } from './contact/contact.component';

const APP_ROUTES: Routes = [
    {path: '', component: ContactComponent},
    {path: 'favorites', component: FavoriteComponent},
    {path: 'form', component: FormComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);