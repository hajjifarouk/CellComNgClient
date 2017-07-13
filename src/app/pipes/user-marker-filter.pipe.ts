import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userMarkerFilter'
})
export class UserMarkerFilterPipe implements PipeTransform {

  transform(markers: any, token: any): any {
    if (token === undefined || token === '') {
      return markers;
    } else {
      return markers.filter(function (marker) {
          return (marker.first_name.toLowerCase().includes(token.toString().toLowerCase()) ||
            marker.last_name.toLowerCase().includes(token.toLowerCase()));
      });
    }
  }

}
