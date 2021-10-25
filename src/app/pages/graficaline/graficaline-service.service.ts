import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraficalineServiceService {

  url = 'http://localhost:5200'
  constructor(private http: HttpClient) { }


  getGraficaLineal():Observable<any>{
    return this.http.get(this.url+'/api/graficas');
  }
}
