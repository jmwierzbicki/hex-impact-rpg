import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterEmpty',
  standalone: true
})
export class FilterEmptyPipe implements PipeTransform {

  transform(value: any[]): any[] {
    return value.filter(item => item != null);
  }

}
