import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ViewPageRoutingModule } from './view-routing.module';
import { ViewPage } from './view.page';
import { SharedModule } from '../shared/shared.module'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, 
    ViewPageRoutingModule,
    SharedModule
  ],
  declarations: [ViewPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add this line
})
export class ViewPageModule {}
