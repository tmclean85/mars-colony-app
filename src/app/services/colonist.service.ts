import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import { Colonists } from '../models/colonists';""

@Injectable()
export class ColonistService {

   private COLONIST_URL = 'https://red-wdp-api.herokuapp.com/api/mars/colonists';


  constructor(private http: Http) { };
    postData(colonist: Colonists) {
      const headers = new Headers({ 'Content-Type': 'application/json'});
      const options = new RequestOptions({ headers });
      return this.http.post(this.COLONIST_URL, {colonist}, options)
              .map(this.extractData);
    }
   
    extractData(res: Response) {
      const colonist = res.json();
      return colonist;
    }
}
