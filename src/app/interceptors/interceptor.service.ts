import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginServiceService } from '../auth/login/login-service.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private authService: LoginServiceService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
    
    /* const headers = new HttpHeaders({
      'x-token': this.authService.getToken()!
    })
    const reqClone = req.clone({
      headers
    }) */
    /* console.log(this.authService.getToken());
    
    return next.handle(req); */
    const tokenizeReq = req.clone({
      setHeaders: {
        'x-token': `${this.authService.getToken()}`
      }
    });
    return next.handle(tokenizeReq);
  }

}
