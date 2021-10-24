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

  constructor(private authService: LoginServiceService) { }

  ngOnInit(): void {
  }
  logout(){
    this.authService.loggoud();
  }
}
