import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPage } from './search.page';
import { SearchPageRoutingModule } from './search-routing.module';
import { SharedModule } from '../shared/shared.module'; 

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SearchPageRoutingModule,
    SharedModule
  ],
  declarations: [SearchPage]
})
export class SearchPageModule {}