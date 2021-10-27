import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../../auth/login/login-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [
    './sidebar.component.css'
  ]
})
export class SidebarComponent implements OnInit {

  nombre:string='';
  constructor(private authService: LoginServiceService) { }

  ngOnInit(): void {
    this.mostrarUsuario();
  }
  logout(){
    this.authService.loggoud();
  }
  mostrarUsuario(){
    this.nombre = `${this.authService.getNombre()}`;
    
  }
}
