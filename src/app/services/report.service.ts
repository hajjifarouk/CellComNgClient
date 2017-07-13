import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw'
import { Report } from '../models/report';
@Injectable()
export class UserService {

  private reportApi = 'http://localhost:1337/report';  // URL to web API
  constructor(private http: Http) { }


  addReport(report:Report): Observable<any> {
    return this.http.post(this.reportApi,report)
      .map(this.extractObjectData)
      .catch(this.handleError);
  }
  editReport(id,update): Observable<any> {
    return this.http.put(this.reportApi+"/"+id,update)
      .map(this.extractObjectData)
      .catch(this.handleError);
  }
deleteReport(id): Observable<any> {
    return this.http.delete(this.reportApi+"/"+id)
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