import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { Observable, of, timer } from 'rxjs';
import { Config } from "../config/config";
import { LoadingController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient, public loadingController: LoadingController) { }

  httpPost(url, postData) {
        let params = {}
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    // headers = headers.set('access-token', accessToken)
    params = postData

    return this.httpClient.post(url, postData, { headers: headers })
      .pipe(map(
        data => {
          console.log('===================');
          console.log('URL', url);
          console.log('POSTDATA', postData);
          console.log('RESPONSE', data);
          console.log('===================');
          
          return data;
          
        }
      ))

  }


  httpGet(url) {

    let params = {}
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    // headers = headers.set('access-token', accessToken)

    return this.httpClient.get(url, { headers: headers })
      .pipe(map(
        data => {
          console.log('===================');
          console.log('URL', url);
          console.log('RESPONSE', data);
          console.log('===================');
          return data;
        }
      ))

  }

}
