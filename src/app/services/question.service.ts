import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw'
import { Question } from '../models/question';
@Injectable()
export class QuestionService {

  private questionApi = 'http://localhost:1337/question';  // URL to web API
  constructor(private http: Http) { }


  addQuestion(question:Question): Observable<any> {
    return this.http.post(this.questionApi,question)
      .map(this.extractObjectData)
      .catch(this.handleError);
  }
  editQuestion(id,update): Observable<any> {
    return this.http.put(this.questionApi+"/"+id,update)
      .map(this.extractObjectData)
      .catch(this.handleError);
  }
deleteQuestion(id): Observable<any> {
    return this.http.delete(this.questionApi+"/"+id)
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