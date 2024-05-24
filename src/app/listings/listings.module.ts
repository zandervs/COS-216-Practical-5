import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListingsPage } from './listings.page';
import { ListingsPageRoutingModule } from './listings-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ListingsPageRoutingModule
  ],
  declarations: [ListingsPage]
})
export class ListingsPageModule {}