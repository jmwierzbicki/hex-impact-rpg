import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'attrDesc',
  standalone: true
})
export class AttrDescPipe implements PipeTransform {

  veryBad = 'Very weak'
  veryGood = 'Above scale'

  strings = [
    'Weak',
    'Poor',
    'Average',
    'Good',
    'Great',
    'Exceptional',
    'Low Superhuman',
    'Superhuman',
    'High Superhuman',
    'Demigod '
  ]

  transform(value: number): string {
    if (value < 1) {
      return `${this.veryBad} (${value})`;
    } else if (value > 10) {
      return  `${this.veryGood} (${value})`;
    }
    return `${this.strings[value-1]} (${value})`
  }
}
