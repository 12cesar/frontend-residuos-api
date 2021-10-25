import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient, private router: Router) { }

  crearToken(formData: FormData):Observable<any>{
    return this.http.post(environment.urlHeroku+'/api/auth/usuario', formData);
  }
  loggedIn(){
    return !!localStorage.getItem('x-token');
  }
  loggoud(){
    localStorage.removeItem('x-token');
    this.router.navigate(['/login']);
  }
  getToken(){
    return localStorage.getItem('x-token');
  }
  getSession(){
    return localStorage.getItem('x-token');
  }
  getNombre(){
    return localStorage.getItem('usuario');
  }
}
