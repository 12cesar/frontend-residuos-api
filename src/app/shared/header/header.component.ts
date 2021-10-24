import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../../auth/login/login-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(private authService: LoginServiceService) { }

  ngOnInit(): void {
  }
  loggoud(){
    this.authService.loggoud();
  }
}
