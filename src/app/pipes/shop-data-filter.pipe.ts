import { Pipe, PipeTransform } from '@angular/core';
import { Shop } from '../models/shop'
@Pipe({
  name: 'shopDataFilter'
})
export class ShopDataFilterPipe implements PipeTransform {

  transform(shops: any, token: any): any {
    if (token === undefined || token.toString() === '') {
      return shops;
    } else {
      return shops.filter(function (shop) {
          return shop.code.toString().includes(token.toString()) || 
          shop.first_name.toLowerCase().includes(token.toString().toLowerCase()) ||
          shop.last_name.toLowerCase().includes(token.toString().toLowerCase()) ||
          shop.address.toLowerCase().includes(token.toString().toLowerCase()) ||
          shop.city.toLowerCase().includes(token.toString().toLowerCase()) ||
          shop.province.toLowerCase().includes(token.toString().toLowerCase());
      });
    }
  }

}
