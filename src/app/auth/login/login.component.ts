import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from './login-service.service';
import { ResultLogin } from '../../interfaces/login-interface';
import { ToastSuccess } from '../../function/validarpost';
import { Router } from '@angular/router';
import { loadData, closeAlert } from '../../function/cargando';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  cargar:boolean=true;
  constructor(private fb: FormBuilder, private loginService:LoginServiceService, private router: Router) {
    this.loginForm = this.fb.group({
      usuario:['', Validators.required],
      password:['', Validators.required]
    })
  }

  ngOnInit(): void {
  }
  crearToken(){
    if (this.cargar) {
      loadData('Validando datos','Porfavor espere');
    }
    const data = new FormData();
    data.append('usuario', this.loginForm.get('usuario')?.value);
    data.append('password', this.loginForm.get('password')?.value);
    this.loginService.crearToken(data).subscribe(
      (data:ResultLogin)=>{
        if (data.ok===true && data.user.rol=== 'ADMIN_ROLE') {
          if (this.cargar) {
            closeAlert();
          }
          this.cargar=false;
          ToastSuccess('success', data.msg)
          localStorage.setItem('x-token', data.token);  
          localStorage.setItem('usuario', data.user.nombre);      
          this.router.navigate(['/dashboard'])
        }  
        else{
          ToastSuccess('error', data.msg);
        }
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }
}
