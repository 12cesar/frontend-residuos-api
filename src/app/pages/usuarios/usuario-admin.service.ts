import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuarioAdminService {

  url = 'https://backen-api-residuos.herokuapp.com';
  constructor(private http: HttpClient) { }

  getUsuarios(unblock:boolean):Observable<any>{
    return this.http.get(this.url+'/api/usuarios',{params:{unblock}});
  }
  getUsuario(id:string):Observable<any>{
    return this.http.get(this.url+'/api/usuarios/'+id);
  }
  getRoles():Observable<any>{
    return this.http.get(this.url+'/api/role');
  }
  postUsuario(formData: FormData):Observable<any>{
    return this.http.post(this.url+'/api/usuarios', formData);
  }
  putUsuario(formData: FormData, id:string):Observable<any>{
    return this.http.put(this.url+'/api/usuarios/'+id, formData);
  }
  deleteUsuario(id:string, unblock:boolean):Observable<any>{
    return this.http.delete(this.url+'/api/usuarios/'+id, {params:{unblock}});
  }
}
