import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class VehiculosServiceService {

  constructor(private http: HttpClient) {}


  getVehiculos(unblock: boolean):Observable<any>{
    return this.http.get(environment.urlHeroku+'/api/vehiculos', {params:{unblock}});
  }
  getVehiculo(id:string):Observable<any>{
    return this.http.get(environment.urlHeroku+'/api/vehiculos/'+id);
  }
  postVehiculo(formData: FormData):Observable<any>{
    return this.http.post(environment.urlHeroku+'/api/vehiculos', formData);
  }
  putVehiculo(formData: FormData, id:string):Observable<any>{
    return this.http.put(environment.urlHeroku+'/api/vehiculos/'+id, formData)
  }
  deleteVehiculo(id:string, unblock:boolean):Observable<any>{
    return this.http.delete(environment.urlHeroku+'/api/vehiculos/'+id, {params:{unblock}})
  }
}
