import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuarioAdminService {

  url = 'https://backen-api-residuos.herokuapp.com';
  constructor(private http: HttpClient) { }

  getUsuario(unblock:boolean):Observable<any>{
    return this.http.get(this.url+'/api/usuarios',{params:{unblock}});
  }
  getRoles():Observable<any>{
    return this.http.get(this.url+'/api/role');
  }
  postUsuario(formData: FormData):Observable<any>{
    return this.http.post(this.url+'/api/usuarios', formData);
  }
}
