import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AnuncioPagesService {

  constructor(private http: HttpClient) { }

  getAnuncios(unblock:boolean):Observable<any>{
    return this.http.get(environment.urlHeroku+'/api/anuncios', {params:{unblock}})
  }
  getAnuncio(id:string):Observable<any>{
    return this.http.get(environment.urlHeroku+'/api/anuncios/'+id);
  }
  postAnuncio(formData: FormData):Observable<any>{
    return this.http.post(environment.urlHeroku+'/api/anuncios', formData);
  }
  putAnuncio(formData: FormData, id:string):Observable<any>{
    return this.http.put(environment.urlHeroku+'/api/anuncios/'+id, formData);
  }
  deletAnuncio(id:string, unblock:boolean):Observable<any>{
    return this.http.delete(environment.urlHeroku+'/api/anuncios/'+id, {params:{unblock}})
  }
}
