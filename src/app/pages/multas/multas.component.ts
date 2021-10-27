import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Multa, ResultMultas, ResultMulta, ResultMultaPost } from '../../interfaces/multas.interface';
import { MultasPagesService } from './multas-pages.service';
import Swal from 'sweetalert2';
import { ToastSuccess } from '../../function/validarpost';
import { WebsocketService } from '../../sockets/websocket.service';
import { loadData, closeAlert } from '../../function/cargando';

@Component({
  selector: 'app-multas',
  templateUrl: './multas.component.html',
  styleUrls: [
    './multas.component.css'
  ]
})
export class MultasComponent implements OnInit {

  multasForm:FormGroup;
  listMultas: Multa[] =[];
  unblock:boolean=true;
  carga:boolean = true;
  id:string='';
  titulo:string = 'Crear';
  pageActual: number = 1;
  constructor(private fb:FormBuilder, private multaService:MultasPagesService, private wsService: WebsocketService) { 
    this.multasForm = this.fb.group({
      titulo:['',Validators.required],
      descripcion:['', Validators.required],
      resolucion:['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.mostrarMulta();
  }
  mostrarMulta(){
    if (this.carga) {
      loadData('Cargando', 'Espere porfavor!!!');
    }
    this.multaService.getMultas(this.unblock).subscribe(
      (data:ResultMultas)=>{
        this.listMultas =data.multa;
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
  crearEditarMulta(){
    if (this.id === '') {
      const data = new FormData();
      data.append('titulo', this.multasForm.get('titulo')?.value);
      data.append('descripcion', this.multasForm.get('descripcion')?.value);
      data.append('resolucion', this.multasForm.get('resolucion')?.value);
      this.multaService.postMulta(data).subscribe(
        (data:ResultMultaPost)=>{
          ToastSuccess('success', data.msg);
          this.multasForm.setValue({
            titulo: '',
            descripcion: '',
            resolucion:''
          });
          this.mostrarMulta();
          const suma =1;
          this.wsService.emit('escuchar-cantidadmultas', suma);
        },
        (error)=>{
          console.log(error);
          
        }
      )
    }
    if (this.id !== '') {
      const data = new FormData();
      data.append('titulo', this.multasForm.get('titulo')?.value);
      data.append('descripcion', this.multasForm.get('descripcion')?.value);
      data.append('resolucion', this.multasForm.get('resolucion')?.value);
      this.multaService.putMulta(data, this.id).subscribe(
        (data:ResultMulta)=>{
          ToastSuccess('success', data.msg);
          this.mostrarMulta();
        },
        (error)=>{
          console.log(error);
        }
      )
    }
  }
  editarMulta(ids:any){
    this.titulo = 'Editar'
    this.multaService.getMulta(ids).subscribe(
      (data:ResultMulta)=>{
        this.multasForm.setValue({
          titulo: data.multa.titulo,
          descripcion: data.multa.descripcion,
          resolucion: data.multa.resolucion,
        });
        this.id = ids;
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  borrarMulta(ids:any, unblock:boolean){
    Swal.fire({
      title: 'Estas seguro?',
      text: unblock ? 'Esta multa sera desbloqueado!!!' :'Esta multa sera bloqueado!!!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: unblock ? 'Si, desbloquear!' :'Si, bloquear!'
    }).then((result) => {
      if (result.isConfirmed) {
        
    this.multaService.deleteMulta(ids, unblock).subscribe(
      (data:ResultMulta)=>{
        
            Swal.fire(
              unblock ? 'Desbloqueado' : 'Bloqueado',
              data.msg,
              'success'
            );
            this.mostrarMulta();
      },
      (error)=>{
        console.log(error);
        
      }
    )}
    })
  }
  ShowSelected($event:any){
    if ($event.target.value === '1') {
      this.unblock = true;
      this.carga =true;
      this.mostrarMulta();
    }
    if ($event.target.value === '2') {
      this.unblock = false;
      this.carga =true;
      this.mostrarMulta();
    }
  }
  cancelar(){
    this.id ='',
    this.titulo ='Crear';
    this.multasForm.setValue({
      titulo: '',
      descripcion: '',
      resolucion:''
    });
  }
}
