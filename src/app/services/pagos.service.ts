import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagosService {
  private authToken = localStorage.getItem('token');
  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${this.authToken}`
    })
  };
  constructor(private http: HttpClient) { }
  getRequest(API) {
    return this.http.get(environment.URL_SERVICE + '/' + API, this.httpOptions);
  }
}
