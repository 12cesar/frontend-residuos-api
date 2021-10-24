import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MensajesPagesService {

  constructor(private http: HttpClient) { }

  getMensajes(unblock:boolean):Observable<any>{
    return this.http.get(environment.urlHeroku+'/api/mensajes', {params:{unblock}});
  }
  getMensaje(id:string):Observable<any>{
    return this.http.get(environment.urlHeroku+'/api/mensajes/'+id);
  }
  postMensaje(formData: FormData):Observable<any>{
    return this.http.post(environment.urlHeroku+'/api/mensajes', formData)
  }
  putMensaje(formData:FormData, id:string):Observable<any>{
    return this.http.put(environment.urlHeroku+'/api/mensajes/'+id, formData);
  }
  deleteMensaje(id:string, unblock:boolean):Observable<any>{
    return this.http.delete(environment.urlHeroku+'/api/mensajes/'+id, {params:{unblock}})
  }
}
