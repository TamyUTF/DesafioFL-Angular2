import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
    exports: [
        MatCardModule,
        MatSidenavModule,
        MatMenuModule,
        MatButtonModule,
        MatTabsModule,
        MatProgressSpinnerModule,
        MatGridListModule
    ]
})
export class MaterialMoodule { }