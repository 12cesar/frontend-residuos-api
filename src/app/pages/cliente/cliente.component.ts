import { Component, OnInit } from '@angular/core';
import { Cliente, ResultCliente } from '../../interfaces/cliente.interface';
import { ClientePagesService } from './cliente-pages.service';

import { loadData, closeAlert } from '../../function/cargando';
import { PdfMakeWrapper, Table } from 'pdfmake-wrapper';
import { ITable } from 'pdfmake-wrapper/lib/interfaces';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
type TableRow = [string, string, string, boolean];
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styles: [
  ]
})
export class ClienteComponent implements OnInit {

  listCliente: Cliente[] = [];
  pageActual: number = 1;
  cargar:boolean = true;
  constructor(private clienteService: ClientePagesService) { }

  ngOnInit(): void {
    this.mostrarClientes();
  }
  mostrarClientes(buscar:string = '') {
    if (this.cargar) {
      loadData('Cargando', 'Espere porfavor!!!');
    }
    this.clienteService.getClientes(buscar).subscribe(
      (data: ResultCliente) => {
        this.listCliente = data.cliente;
        if (this.cargar) {
          closeAlert();
        }
        this.cargar=false;
      },
      (error) => {
        console.log(error);
      }
    )
  }
  async crearReporte() {
    PdfMakeWrapper.setFonts(pdfFonts);
    const pdf = new PdfMakeWrapper();
    const data = this.listCliente;
    pdf.add(this.createTable(this.listCliente));
    pdf.create().download();
  }
  createTable(data: Cliente[]):ITable{
    return new Table([
      ['NOMBRE DEL CONTRIBUYENTE','DNI','TIPO','ESTADO'],
      ...this.extractData(data)
    ])
    .widths([300, 70,60,50])
    .layout({
      fillColor:(rowIndex?:number, node?:any, columnIndex?:number)=>{
        return rowIndex===0 ? '#8F9B9C' : ''
      }
    })
    .end;
  }
  extractData(data:Cliente[]):TableRow[]{
    return data.map(row=>[row.nombre.toLowerCase(), row.dni, row.tipo, row.estado]);
  }
  onKeypressEvent(event: any){
    if (event.target.value === "") {
      this.mostrarClientes();      
    }
    this.mostrarClientes(event.target.value);
 }
}
