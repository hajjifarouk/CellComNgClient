import { Pipe, PipeTransform } from '@angular/core';
import { Shop } from '../models/shop'
@Pipe({
  name: 'shopMarkerFilter'
})
export class ShopMarkerFilterPipe implements PipeTransform {
  transform(markers: any, token: any): any {
     var dispMarker:Array<any>=[];
      markers.forEach(marker => {
        if(marker.place!=null){
          dispMarker.push(marker);
        }
      });
    if (token === undefined || token.toString() === '') {
      return dispMarker;
    } else {
      return dispMarker.filter(function (marker) {
        if(marker.place!==null){
          return marker.code.toString().includes(token.toString());
        }
      });
    }
  }

}
