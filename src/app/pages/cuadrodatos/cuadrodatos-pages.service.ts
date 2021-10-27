import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CuadrodatosPagesService {

  constructor(private http: HttpClient) { }
  getCliente():Observable<any>{
    return this.http.get(environment.urlHeroku+'/api/graficas/list/clientes');
  }
  getMensaje():Observable<any>{
    return this.http.get(environment.urlHeroku+'/api/graficas/list/mensajes');
  }
  getMultas():Observable<any>{
    return this.http.get(environment.urlHeroku+'/api/graficas/list/multas');
  }
  getAnuncios():Observable<any>{
    return this.http.get(environment.urlHeroku+'/api/graficas/list/anuncios');
  }
}
