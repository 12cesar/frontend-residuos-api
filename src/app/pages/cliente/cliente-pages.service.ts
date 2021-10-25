import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ClientePagesService {

  constructor(private http:HttpClient) { }
  getClientes():Observable<any>{
    return this.http.get(environment.urlHeroku+'/api/clientes',{params:{unblock:true}})
  }
}
