import { Component, OnInit } from '@angular/core';
import { ResultGraficaLineal } from 'src/app/interfaces/lineal-grafica-interface';
import { GraficalineServiceService } from './graficaline-service.service';
import { loadData, closeAlert } from '../../function/cargando';
import { WebsocketService } from '../../sockets/websocket.service';

@Component({
  selector: 'app-graficaline',
  templateUrl: './graficaline.component.html',
  styles: [
  ]
})
export class GraficalineComponent implements OnInit {

  carga:boolean=true;
  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81], label: 'Clientes' },
  ];
  public lineChartLabels: Array<any> = ['Enero', 'Febrero', 'Marzo', 'Abril','Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  constructor(private graficaService: GraficalineServiceService, private wsService:WebsocketService) { 

  }

  ngOnInit(): void {
    this.mostrarGrafica();
    this.escucharSocket();
  }

  mostrarGrafica(){
    if (this.carga) {
      loadData('Cargando', 'Porfavor espere!!')
    }
    this.graficaService.getGraficaLineal().subscribe(
      (data:ResultGraficaLineal)=>{
        this.lineChartData =data.data;
        if (this.carga) {
          closeAlert();
        }
        this.carga=false
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  escucharSocket(){
    console.log('hola');
    this.wsService.listen('cambio-grafica').subscribe(
      (data:any)=>{
        console.log(data);
        this.lineChartData = data;        
      }
    )
  }
}

/* setInterval(() => {
  const data = [
    Math.round(Math.random() * 100),
    Math.round(Math.random() * 100),
    Math.round(Math.random() * 100),
    Math.round(Math.random() * 100)
  ];
  this.lineChartData = [{data, label:'Clientes'}]
}, 3000); */