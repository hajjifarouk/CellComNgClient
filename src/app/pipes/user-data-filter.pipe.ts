import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userDataFilter'
})
export class UserDataFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
