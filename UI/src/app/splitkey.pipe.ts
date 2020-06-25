import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitkey'
})
export class SplitkeyPipe implements PipeTransform {

 transform(attributeName) {
    
    return attributeName.split(',');
  }
}
