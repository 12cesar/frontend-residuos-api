import { Anuncio } from './../../interfaces/anuncio-interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnuncioPagesService } from './anuncio-pages.service';
import { ResultAnuncios, ResultAnuncio } from '../../interfaces/anuncio-interface';
import { loadData, closeAlert } from '../../function/cargando';
import Swal from 'sweetalert2';
import { ToastSuccess } from '../../function/validarpost';

@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.component.html',
  styleUrls: [
    './anuncio.compnent.css'
  ]
})
export class AnuncioComponent implements OnInit {

  listAnuncio?: Anuncio[];
  anuncioForm: FormGroup;
  carga:boolean =true;
  unblock:boolean=true;
  id:string='';
  titulo:string='Crear';
  constructor(private fb: FormBuilder, private anuncioService: AnuncioPagesService) { 
    this.anuncioForm= this.fb.group({
      descripcion:['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.mostrarAnuncio();
  }
  mostrarAnuncio(){
    if (this.carga) {
      loadData('Cargando', 'Porfavor espere!!');
    }
    this.anuncioService.getAnuncios(this.unblock).subscribe(
      (data:ResultAnuncios)=>{
        this.listAnuncio = data.anuncio;
        if (this.carga) {
          closeAlert();
        }
        this.carga = false;
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }
  crearEditarVehiculo(){
    if (this.id === '') {
        const data = new FormData();
        data.append('descripcion', this.anuncioForm.get('descripcion')?.value);
        this.anuncioService.postAnuncio(data).subscribe(
          (data: ResultAnuncio)=>{
            ToastSuccess('success', data.msg);
            this.anuncioForm.setValue({
              descripcion: '',
            });
            this.mostrarAnuncio();
          },
          (error)=>{
            console.log(error);
            
          }
        )
    }
    if (this.id !== '') {
      const data = new FormData();
      data.append('descripcion', this.anuncioForm.get('descripcion')?.value)
        this.anuncioService.putAnuncio(data, this.id).subscribe(
          (data:ResultAnuncio)=>{
            ToastSuccess('success', data.msg);
            this.mostrarAnuncio();
          },
          (error)=>{
            ToastSuccess('warning', error.error.errors[0].msg.toLowerCase())
          }
        )
    }
  }
  editarVehiculo(ids:any){
    this.titulo = 'Editar'
    this.anuncioService.getAnuncio(ids).subscribe(
      (data:ResultAnuncio)=>{
        this.anuncioForm.setValue({
          descripcion: data.anuncio.descripcion,
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
        
    this.anuncioService.deletAnuncio(ids, unblock).subscribe(
      (data:ResultAnuncio)=>{
        
            Swal.fire(
              unblock ? 'Desbloqueado' : 'Bloqueado',
              data.msg,
              'success'
            );
            this.mostrarAnuncio();
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
      this.mostrarAnuncio();
    }
    if ($event.target.value === '2') {
      this.unblock = false;
      this.carga =true;
      this.mostrarAnuncio();
    }
  }
  cancelar(){
    this.id ='',
    this.titulo ='Crear';
    this.anuncioForm.setValue({
      descripcion: '',
    });
  }
}
