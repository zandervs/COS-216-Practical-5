import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {
  transform(value: number | string, ...args: unknown[]): string {
    if (value == null) {
      return '';
    }

    // Convert the value to an integer to remove decimals
    const intValue = Math.floor(Number(value));

    // Convert number to string and format with spaces
    let formattedValue = intValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    // Add ZAR currency symbol
    return `R ${formattedValue}`;
  }
}