import { Component, OnInit } from '@angular/core';
import { Cliente, ResultCliente } from '../../interfaces/cliente.interface';
import { ClientePagesService } from './cliente-pages.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styles: [
  ]
})
export class ClienteComponent implements OnInit {

  listCliente?: Cliente[];
  constructor(private clienteService: ClientePagesService) { }

  ngOnInit(): void {
    this.mostrarClientes();
  }
  mostrarClientes(){
    this.clienteService.getClientes().subscribe(
      (data:ResultCliente)=>{
        console.log(data);
        this.listCliente = data.cliente;
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }
}
