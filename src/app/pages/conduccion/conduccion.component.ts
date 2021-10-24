import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Conduccion, ResultConducciones, ResultConduccion, ResultConduccionPer } from '../../interfaces/conduccion-interface';
import { ConduccionPagesService } from './conduccion-pages.service';
import { loadData, closeAlert } from '../../function/cargando';
import { Usuario } from '../../interfaces/anuncio-interface';
import { ResultVehiculos, Vehiculo } from '../../interfaces/vehiculo-interface';
import { ResultUser } from '../../interfaces/user-interface';
import Swal from 'sweetalert2';
import { ToastSuccess } from '../../function/validarpost';

@Component({
  selector: 'app-conduccion',
  templateUrl: './conduccion.component.html',
  styleUrls: [
    './conduccion.component.css'
  ]
})
export class ConduccionComponent implements OnInit {

  listConduccion?:Conduccion[];
  listChofer?:Usuario[];
  listVehiculo?: Vehiculo[];
  conduccionForm:FormGroup;
  carga:boolean =true;
  titulo: string ='Crear';
  id:string='';
  constructor(private fb: FormBuilder, private conduccionService:ConduccionPagesService) { 
    this.conduccionForm = this.fb.group({
      chofer:['', Validators.required],
      vehiculo:['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.mostrarConduccion();
    this.mostrarChofer();
    this.mostrarVehiculo();
  }
  mostrarConduccion(){
    if (this.carga) {
      loadData('Cargando', 'Porfavor espere!!!')
    }
    this.conduccionService.getConducciones().subscribe(
      (data:ResultConducciones)=>{
        
        
        this.listConduccion = data.conduccion;
        console.log(this.listConduccion);
        
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
  mostrarChofer(){
    this.conduccionService.getChofer().subscribe(
      (data:ResultUser)=>{
        this.listChofer = data.usuario;
        console.log(this.listChofer);
        
      }
    )
  }
  mostrarVehiculo(){
    this.conduccionService.getVehiculo().subscribe(
      (data:ResultVehiculos)=>{
        this.listVehiculo = data.vehiculo;
        console.log(this.listVehiculo);
        
      }
    )
  }
  crearEditarVehiculo(){
    if (this.id === '') {
        const data = new FormData();
        data.append('chofer', this.conduccionForm.get('chofer')?.value);
        data.append('vehiculo', this.conduccionForm.get('vehiculo')?.value);
        this.conduccionService.postConduccion(data).subscribe(
          (data:ResultConduccion)=>{
            ToastSuccess('success', data.msg)
            this.conduccionForm.setValue({
              chofer: '',
              vehiculo: '',
            });
            this.mostrarConduccion();
          },
          (error)=>{
            console.log(error);
            
          }
        )
    }
    if (this.id !== '') {
      const data = new FormData();
        data.append('chofer', this.conduccionForm.get('chofer')?.value);
        data.append('vehiculo', this.conduccionForm.get('vehiculo')?.value);
        this.conduccionService.putConduccion(data, this.id).subscribe(
          (data:ResultConduccion)=>{
            ToastSuccess('success', data.msg)
            this.mostrarConduccion();
          },
          (error)=>{
            console.log(error);
          }
        )
    }
    
  }
  editarVehiculo(ids:any){
    this.titulo = 'Editar'
    this.conduccionService.getConduccion(ids).subscribe(
      (data:ResultConduccionPer)=>{
        this.conduccionForm.setValue({
          chofer: data.conduccion.chofer,
          vehiculo: data.conduccion.vehiculo,
        });
        this.id = ids;
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  borrarVehiculo(ids:any){
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Esta relacion sera Eliminado!!!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
    this.conduccionService.deleteConduccion(ids).subscribe(
      (data:ResultConduccion)=>{
        
            Swal.fire(
              'Eliminado',
              'Conduccion eliminado con exito',
              'success'
            );
            this.mostrarConduccion();
      },
      (error)=>{
        console.log(error);
        
      }
    )}
    })
  }
  cancelar(){
    this.id ='',
    this.titulo ='Crear';
    this.conduccionForm.setValue({
      chofer: '',
      vehiculo: '',
    });
  }
}
