import { Component, OnInit } from '@angular/core';
import { ResultGraficaLineal } from 'src/app/interfaces/lineal-grafica-interface';
import { GraficalineServiceService } from './graficaline-service.service';

@Component({
  selector: 'app-graficaline',
  templateUrl: './graficaline.component.html',
  styles: [
  ]
})
export class GraficalineComponent implements OnInit {

  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81], label: 'Clientes' },
  ];
  public lineChartLabels: Array<any> = ['Enero', 'Febrero', 'Marzo', 'Abril','Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  constructor(private graficaService: GraficalineServiceService) { 

  }

  ngOnInit(): void {
    this.mostrarGrafica();
  }

  mostrarGrafica(){
    this.graficaService.getGraficaLineal().subscribe(
      (data:ResultGraficaLineal)=>{
        this.lineChartData =data.data;
        
      },
      (error)=>{
        console.log(error);
        
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