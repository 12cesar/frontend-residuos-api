import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  public fecha: number = new Date().getFullYear();
  page:string='Dashboard'
  constructor(private router: Router) { 
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
          // Show loading indicator
           const url= event.url;
           if (url === '/dashboard') {
             this.page = 'Dashboard'
           }else{
            
            const url2 = url.slice(11);
            const may = url2.charAt(0).toUpperCase();
            this.page = may.toUpperCase()+url2.slice(1);
            
            
           }
           
      }

      if (event instanceof NavigationEnd) {
          // Hide loading indicator
      }

      if (event instanceof NavigationError) {
          // Hide loading indicator

          // Present error to user
          console.log(event.error);
      }
  });
  }

  ngOnInit(): void {
  }

}
