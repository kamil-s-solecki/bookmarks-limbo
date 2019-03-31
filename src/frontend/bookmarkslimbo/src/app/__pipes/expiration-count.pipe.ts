import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'expirationCount'
})
export class ExpirationCountPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return '1 days, 3 hours';
  }

}
