import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CuadrodatosPagesService {

  constructor(private http: HttpClient) { }
  getCliente():Observable<any>{
    return this.http.get('http://localhost:5200'+'/api/graficas/list/clientes');
  }
  getMensaje():Observable<any>{
    return this.http.get('http://localhost:5200'+'/api/graficas/list/mensajes');
  }
  getMultas():Observable<any>{
    return this.http.get('http://localhost:5200'+'/api/graficas/list/multas');
  }
  getAnuncios():Observable<any>{
    return this.http.get('http://localhost:5200'+'/api/graficas/list/anuncios');
  }
}
