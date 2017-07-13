import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw'
import { Shop } from '../models/shop';
@Injectable()
export class ShopService {

  private shopApi = 'http://localhost:1337/shop';  // URL to web API
  constructor(private http: Http) { }


  addShop(shop: Shop): Observable<any> {
    return this.http.post(this.shopApi, shop)
      .map(this.extractObjectData)
      .catch(this.handleError);
  }
  importShops(myFile: File) {
    return this.http.post("http://localhost:1337/api", myFile);
  }
  editShop(id, update): Observable<any> {
    console.log(update);
    return this.http.put(this.shopApi + "/" + id, update)
      .map(this.extractObjectData)
      .catch(this.handleError);
  }
  deleteShop(id): Observable<any> {
    return this.http.delete(this.shopApi + "/" + id)
      .map(this.extractObjectData)
      .catch(this.handleError);
  }
  private extractArrayData(res: Response) {
    let body = res.json();
    return body || [];
  }
  private extractObjectData(res: Response) {
    let body = res.json();
    return body || {};
  }
  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      console.error(error);
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
