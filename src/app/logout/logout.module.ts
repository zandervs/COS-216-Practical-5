import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogoutPage } from './logout.page';
import { LogoutPageRoutingModule } from './logout-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LogoutPageRoutingModule
  ],
  declarations: [LogoutPage]
})
export class LogoutPageModule {}