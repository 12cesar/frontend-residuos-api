import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  public fecha: number = new Date().getFullYear();
  constructor() { }

  ngOnInit(): void {
  }

}
