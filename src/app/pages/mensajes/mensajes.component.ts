import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mensaje, ResultMensajes, ResultMensaje } from '../../interfaces/mensajes-interface';
import { MensajesPagesService } from './mensajes-pages.service';
import { loadData, closeAlert } from '../../function/cargando';
import Swal from 'sweetalert2';
import { ToastSuccess } from '../../function/validarpost';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: [
    './mensajes.component.css'
  ]
})
export class MensajesComponent implements OnInit {

  listMensajes?: Mensaje[];
  mensajeForm:FormGroup;
  unblock:boolean =true;
  carga:boolean=true;
  titulo:string = 'Crear';
  id:string='';
  constructor(private fb: FormBuilder, private mensajeService: MensajesPagesService) {
    this.mensajeForm= this.fb.group({
      titulo:['', Validators.required],
      descripcion:['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.mostrarMensajes();
  }
  mostrarMensajes(){
    if (this.carga) {
      loadData('Cargando', 'Porfavor espere!')
    }
    this.mensajeService.getMensajes(this.unblock).subscribe(
      (data:ResultMensajes)=>{
        this.listMensajes = data.mensaje;
        if (this.carga) {
          closeAlert();
        }
        this.carga =false;
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }
  crearEditarVehiculo(){
    if (this.id === '') {
      const data = new FormData();
      data.append('titulo', this.mensajeForm.get('titulo')?.value)
      data.append('descripcion', this.mensajeForm.get('descripcion')?.value)
      this.mensajeService.postMensaje(data).subscribe(
        (data: ResultMensaje)=>{
          ToastSuccess('success', data.msg);
          this.mensajeForm.setValue({
            titulo: '',
            descripcion: '',
          });
          this.mostrarMensajes();
        },
        (error)=>{
          console.log(error);
          
        }
      )
    }
    if (this.id !== '') {
      const data = new FormData();
      data.append('titulo', this.mensajeForm.get('titulo')?.value)
      data.append('descripcion', this.mensajeForm.get('descripcion')?.value)
        this.mensajeService.putMensaje(data, this.id).subscribe(
          (data:ResultMensaje)=>{
            ToastSuccess('success', data.msg);
            this.mostrarMensajes();
          },
          (error)=>{
            ToastSuccess('warning', error.error.errors[0].msg.toLowerCase())
          }
        )
    }

  }
  editarVehiculo(ids:any){
    this.titulo = 'Editar'
    this.mensajeService.getMensaje(ids).subscribe(
      (data:ResultMensaje)=>{
        this.mensajeForm.setValue({
          titulo: data.mensaje.titulo,
          descripcion: data.mensaje.descripcion,
        });
        this.id = ids;
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  borrarVehiculo(ids:any, unblock:boolean){
    Swal.fire({
      title: 'Estas seguro?',
      text: unblock ? 'Este vehiculo sera desbloqueado!!!' :'Este vehiculo sera bloqueado!!!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: unblock ? 'Si, desbloquear!' :'Si, bloquear!'
    }).then((result) => {
      if (result.isConfirmed) {
        
    this.mensajeService.deleteMensaje(ids, unblock).subscribe(
      (data:ResultMensajes)=>{
        
            Swal.fire(
              unblock ? 'Desbloqueado' : 'Bloqueado',
              data.msg,
              'success'
            );
            this.mostrarMensajes();
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
      this.mostrarMensajes();
    }
    if ($event.target.value === '2') {
      this.unblock = false;
      this.carga =true;
      this.mostrarMensajes();
    }
  }
  cancelar(){
    this.id ='',
    this.titulo ='Crear';
    this.mensajeForm.setValue({
      titulo: '',
      descripcion: '',
    });
  }
}
