import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MultasPagesService {

  constructor(private http:HttpClient) { }

  getMultas(unblock:boolean):Observable<any>{
    return this.http.get(environment.urlHeroku+'/api/multas',{params:{unblock}});
  }
  getMulta(id:string):Observable<any>{
    return this.http.get(environment.urlHeroku+'/api/multas/'+id);
  }
  postMulta(formData: FormData):Observable<any>{
    return this.http.post(environment.urlHeroku+'/api/multas', formData);
  }
  putMulta(formData: FormData, id:string):Observable<any>{
    return this.http.put(environment.urlHeroku+'/api/multas/'+id, formData);
  }
  deleteMulta(id:string, unblock:boolean):Observable<any>{
    return this.http.delete(environment.urlHeroku+'/api/multas/'+id, {params:{unblock}});
  }
}
