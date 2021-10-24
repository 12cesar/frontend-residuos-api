
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculosServiceService } from './vehiculos-service.service';
import { loadData, closeAlert } from '../../function/cargando';
import { ResultVehiculos, Vehiculo, ResultVehiculo } from '../../interfaces/vehiculo-interface';
import { ToastSuccess } from '../../function/validarpost';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: [
    './vehiculo.component.css'
  ]
})
export class VehiculosComponent implements OnInit {
  vehiculosForm: FormGroup;
  listVehiculo?: Vehiculo[];
  unblock:boolean =true;
  cargar?:boolean =true;
  titulo:string = 'Crear';
  id:string='';
  constructor(private fb: FormBuilder, private vehiculoService: VehiculosServiceService) { 
    this.vehiculosForm = this.fb.group({
      nombre:['',Validators.required],
      marca:['',Validators.required],
      color:['',Validators.required],
      año:['',Validators.required],
      placa:['',Validators.required],
    })

  }

  ngOnInit(): void {
    this.mostrarVehiculos()
  }


  mostrarVehiculos(){
    if (this.cargar) {
      loadData('Cargando', 'Espere mientras carga la informacion')
    }
    this.vehiculoService.getVehiculos(this.unblock).subscribe(
      (data: ResultVehiculos) => {
        this.listVehiculo = data.vehiculo;
        if (this.cargar) {
          closeAlert();  
        }
        this.cargar = false;
         
      }
    )
    
  }
  crearEditarVehiculo(){
    if (this.id === '') {
        const data = new FormData();
        data.append('nombre', this.vehiculosForm.get('nombre')?.value);
        data.append('marca', this.vehiculosForm.get('marca')?.value);
        data.append('color', this.vehiculosForm.get('color')?.value);
        data.append('ano', this.vehiculosForm.get('año')?.value);
        data.append('placa', this.vehiculosForm.get('placa')?.value);
        this.vehiculoService.postVehiculo(data).subscribe(
          (data:ResultVehiculos)=>{
            ToastSuccess('success', data.msg);
            this.vehiculosForm.setValue({
              nombre: '',
              marca: '',
              color: '',
              año: '',
              placa:''
            });
            this.mostrarVehiculos();
          },
          (error)=>{
            ToastSuccess('warning', error.error.errors[0].msg.toLowerCase())
          }
        )
    }
    if (this.id !== '') {
      const data = new FormData();
        data.append('nombre', this.vehiculosForm.get('nombre')?.value);
        data.append('marca', this.vehiculosForm.get('marca')?.value);
        data.append('color', this.vehiculosForm.get('color')?.value);
        data.append('ano', this.vehiculosForm.get('año')?.value);
        data.append('placa', this.vehiculosForm.get('placa')?.value);
        this.vehiculoService.putVehiculo(data, this.id).subscribe(
          (data:ResultVehiculos)=>{
            this.mostrarVehiculos();
            ToastSuccess('success', data.msg);
          },
          (error)=>{
            ToastSuccess('warning', error.error.errors[0].msg.toLowerCase())
          }
        )
    }
    
  }
  editarVehiculo(ids:any){
    this.titulo = 'Editar'
    this.vehiculoService.getVehiculo(ids).subscribe(
      (data:ResultVehiculo)=>{
        this.vehiculosForm.setValue({
          nombre: data.vehiculo.nombre,
          marca: data.vehiculo.marca,
          color: data.vehiculo.color,
          año: data.vehiculo.ano,
          placa:data.vehiculo.placa
        });
        this.id = ids;
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  borrarVehiculo(id:any, unblock:boolean){
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
        
    this.vehiculoService.deleteVehiculo(id, unblock).subscribe(
      (data:ResultVehiculo)=>{
        
            Swal.fire(
              unblock ? 'Desbloqueado' : 'Bloqueado',
              data.msg,
              'success'
            );
            this.mostrarVehiculos();
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
      this.cargar =true;
      this.mostrarVehiculos();
    }
    if ($event.target.value === '2') {
      this.unblock = false;
      this.cargar =true;
      this.mostrarVehiculos();
    }
  }
  cancelar(){
    this.id ='',
    this.titulo ='Crear';
    this.vehiculosForm.setValue({
      nombre: '',
      marca: '',
      color: '',
      año: '',
      placa:''
  })
  }
}
