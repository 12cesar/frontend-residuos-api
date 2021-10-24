import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ConduccionPagesService {

  constructor(private http: HttpClient) { }

  getChofer():Observable<any>{
    return this.http.get(environment.urlHeroku+'/api/usuarios/tipo/chofer');
  }
  getVehiculo():Observable<any>{
    return this.http.get(environment.urlHeroku+'/api/vehiculos',{params:{unblock:true}})
  }
  getConducciones():Observable<any>{
    return this.http.get(environment.urlHeroku+'/api/conduccion');
  }
  getConduccion(id:string):Observable<any>{
    return this.http.get(environment.urlHeroku+'/api/conduccion/'+id);
  }
  postConduccion(formData: FormData):Observable<any>{
    return this.http.post(environment.urlHeroku+'/api/conduccion', formData);
  }
  putConduccion(formData: FormData, id:string):Observable<any>{
    return this.http.put(environment.urlHeroku+'/api/conduccion/'+id, formData);
  }
  deleteConduccion(id:string):Observable<any>{
    return this.http.delete(environment.urlHeroku+'/api/conduccion/'+id);
  }
}
