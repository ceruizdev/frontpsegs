import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/json'
    })
  };
  constructor(private http: HttpClient) { }

  getRequest(API) {
    return this.http.post(environment.URL_SERVICE + '/' + API, this.httpOptions);
  }
}
