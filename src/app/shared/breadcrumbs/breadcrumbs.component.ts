import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { BreadcrumbsService } from './breadcrumbs.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit {

  public page:string = '';
  constructor(private bread:BreadcrumbsService, private activatedRoute : ActivatedRoute) { 
    this.activatedRoute.url.subscribe(url =>{
      this.page = url[0].path;
  });
 
  }

  ngOnInit(): void {
    //this.page= this.bread.mostrarPage();
    //console.log('siiiii');
    
  }
  
}
