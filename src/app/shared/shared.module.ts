import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomCurrencyPipe } from 'src/app/custom-currency.pipe'; // Adjust the path as needed

@NgModule({
  declarations: [CustomCurrencyPipe],
  imports: [CommonModule],
  exports: [CustomCurrencyPipe]
})
export class SharedModule {}
