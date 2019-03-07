import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
    exports: [
        MatCardModule,
        MatSidenavModule,
        MatMenuModule,
        MatButtonModule,
        MatTabsModule
    ]
})
export class MaterialMoodule { }