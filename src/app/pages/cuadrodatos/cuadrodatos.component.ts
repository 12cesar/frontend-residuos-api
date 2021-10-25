import { Component, OnInit } from '@angular/core';
import { CuadrodatosPagesService } from './cuadrodatos-pages.service';
import { WebsocketService } from '../../sockets/websocket.service';

@Component({
  selector: 'app-cuadrodatos',
  templateUrl: './cuadrodatos.component.html',
  styles: [
  ]
})
export class CuadrodatosComponent implements OnInit {

  clientes?:number;
  mensajes?:number;
  multas?:number;
  anuncios?:number;
  constructor(private cuadroDatosService: CuadrodatosPagesService, private wsService: WebsocketService) { }

  ngOnInit(): void {
    this.mostrarDatos();
    this.escucharSocket();
  }
  mostrarDatos(){
    this.cuadroDatosService.getCliente().subscribe(
      (data:any)=>{
        this.clientes = data.cliente;
      },
      (error)=>{
        console.log(error);
        
      }
    )
    this.cuadroDatosService.getMensaje().subscribe(
      (data:any)=>{
        this.mensajes = data.mensaje;
      },
      (error)=>{
        console.log(error);
        
      }
    )
    this.cuadroDatosService.getMultas().subscribe(
      (data:any)=>{
        this.multas = data.multa;
      },
      (error)=>{
        console.log(error);
        
      }
    )
    this.cuadroDatosService.getAnuncios().subscribe(
      (data:any)=>{
        this.anuncios = data.anuncio;
      },
      (error)=>{
        console.log(error);
        
      }
    )
    
  }

  escucharSocket(){
    this.wsService.listen('escuchar-cantidadmensaje').subscribe(
      (data:any)=>{
        console.log(data);
        
        this.mensajes += data;
      }
    )
    this.wsService.listen('escuchar-cantidadmultas').subscribe(
      (data:any)=>{
        console.log(data);
        this.multas += data;
      }
    )
    this.wsService.listen('escuchar-cantidadanuncios').subscribe(
      (data:any)=>{
        console.log(data);
        this.anuncios += data;
        
      }
    )
  }

}
