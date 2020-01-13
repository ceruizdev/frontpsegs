import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InformacionPersonalService {
  private authToken = localStorage.getItem('token');
  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${this.authToken}`
    })
  };
  constructor(private http: HttpClient) { }
  getInfoUsuario(API) {
    return this.http.get(environment.URL_SERVICE + '/' + API, this.httpOptions);
  }
}
