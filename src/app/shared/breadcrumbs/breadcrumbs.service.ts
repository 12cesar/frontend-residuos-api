import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {

  constructor(private router:Router) { }

  mostrarPage(){
    const url = this.router.url;    
    const url2= url.slice(1);
    const may = url2.charAt(0).toUpperCase();
    const urlNew = may+ url2.slice(1);
    return urlNew;
  }
}
