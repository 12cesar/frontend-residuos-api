import { Component, OnInit } from '@angular/core';
import { Lugar, RespMarcadores } from '../../interfaces/lugar.interface';

import * as mapboxgl from 'mapbox-gl';
import { UbicacionPagesService } from './ubicacion-pages.service';
import { WebsocketService } from '../../sockets/websocket.service';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: [
    './ubicacion.component.css'
  ]
})
export class UbicacionComponent implements OnInit {


  mapa?:mapboxgl.Map;
  //lugares: Lugar[] = [];
  lugares:{[key:string]:Lugar}={};
  markersMapbox: {[id:string]: mapboxgl.Marker} ={};
  constructor(private ubicacionService: UbicacionPagesService, private wsService: WebsocketService) { }

  ngOnInit(): void {
    //this.mostrarUbicaciones();
    
    this.mostrarUbicaciones();
    this.escucharSockets();
  }

   mostrarUbicaciones(){
    this.ubicacionService.getUbicacion().subscribe(
      (data:RespMarcadores)=>{
        this.lugares = data;
        this.crearMapa();
      },(error)=>{
        console.log(error);
      }
    )
  }
  escucharSockets(){
    //Marcador-nuevo
    this.wsService.listen('marcador-nuevo').subscribe(
      (marcador: any)=>{
        this.agregarMarcador(marcador);
      },(error)=>{
        console.log(error);
        
      }
    )
    //Marcador-mover
    this.wsService.listen('marcador-mover').subscribe(
      (marcador:any)=>{
        this.markersMapbox[marcador.id]
              .setLngLat([marcador.lng, marcador.lat])
      }
    )
    //Marcador-Borrar
    this.wsService.listen('marcador-borrar').subscribe(
      (id: any)=>{
        this.markersMapbox[id].remove();
        delete this.markersMapbox[id];        
      },(error)=>{
        console.log(error);
        
      }
    )
  }

  crearMapa() {
    this.mapa = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      accessToken: 'pk.eyJ1IjoidGlnZXIxMjE0IiwiYSI6ImNrcDd0cDl2NTAzM2syeG1zdzV4NWEwaGIifQ.xYnNZjDu30SiuGKjzgh_jg',
      center:[-74.580688 , -8.365221],
      zoom:12
    });

    for(const [key,marcador] of Object.entries(this.lugares)){      
      this.agregarMarcador(marcador)
    } 


  }
  agregarMarcador(marcador:Lugar){
    const h1 = document.createElement('h2');
    h1.innerText = marcador.nombre.toLowerCase();
    const h2 = document.createElement('h2');
    h2.innerText = marcador.vehiculo.toLowerCase();
    //const btnBorrar = document.createElement('button');
    //btnBorrar.innerText = 'Desconectar';
    const div = document.createElement('div');
    div.setAttribute('style','width:100px, height:100px')
    div.append(h1, h2);
    const customPopup = new mapboxgl.Popup({
      offset:25,
      closeOnClick:false
    }).setDOMContent(div);
    const marker = new mapboxgl.Marker({
      draggable:false,
      color:marcador.color,
    })
    .setLngLat([marcador.lng, marcador.lat])
    .setPopup(customPopup)
    .addTo(this.mapa!)

    marker.on('drag', ()=>{
      const lngLat = marker.getLngLat();
      
      //TODO: Crear evento para emitir las coordenadas de este marcador
      const nuevoMarcador ={
        id:marcador.id,
        ...lngLat
      };
      this.wsService.emit('marcador-mover', nuevoMarcador);
      
    });

    /* btnBorrar.addEventListener('click', ()=>{
      marker.remove();

      //TODO: Eliminar el marcador mediante sockets
      this.wsService.emit('marcador-borrar', marcador.id);

    }) */

    this.markersMapbox[marcador.id] = marker;
    


  }
  crearMarcador(){
    const customMarker:Lugar= {
      id: new Date().toISOString(),
      lng: -74.580688 ,  
      lat: -8.365221,
      nombre: 'julio cesar calderon galindo',
      vehiculo: 'vehiculo 3',
      color:'#' + Math.floor(Math.random()*16777215).toString(16) 
    }
    this.agregarMarcador(customMarker);
    //emitir marcador -nuevo
    this.wsService.emit('marcador-nuevo', customMarker)
  }
}
