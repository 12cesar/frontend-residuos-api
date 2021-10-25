import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UbicacionPagesService {

  constructor(private http: HttpClient) { }
  getUbicacion():Observable<any>{
    return this.http.get('http://localhost:5200'+'/api/ubicacion/mapa');
  }
}
