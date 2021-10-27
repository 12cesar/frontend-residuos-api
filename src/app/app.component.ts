import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './sockets/websocket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'adminpro';
  constructor(private wsService: WebsocketService){
    
  }
 
  ngOnInit(): void {
    this.escucharSocket();
  }
  escucharSocket(){
    this.wsService.listen('escuchar-mensaje').subscribe(
      (data:any)=>{
        console.log(data);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: data.descripcion,
          showConfirmButton: false,
          timer: 1500
        })
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }
}
