
import { Component, OnInit } from '@angular/core';
import { UsuarioAdminService } from './usuario-admin.service';
import { ResultUser, Usuario, ResultUserIndi } from '../../interfaces/user-interface';
import { ResultRole, Role } from '../../interfaces/role-interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastSuccess } from '../../function/validarpost';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: [
    './usuarios.component.css'
  ]
})
export class UsuariosComponent implements OnInit {
  listUsuario?: Usuario[];
  listRoles?: Role[];
  titulo: string = 'Crear';
  id: string = '';
  usuarioForm: FormGroup;
  unblock:boolean =true;
  constructor(private usuarioService: UsuarioAdminService, private fb: FormBuilder) {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      usuario: ['', Validators.required],
      password: [''],
      rol: ['', Validators.required]
    })
  }
  cargando: boolean = false
  ngOnInit(): void {
    this.mostrarUsuario();
    this.getRoles();
  }

  mostrarUsuario() {
    this.usuarioService.getUsuarios(this.unblock).subscribe(
      (data: ResultUser) => {
        this.listUsuario = data.usuario;
      }
    )
  }

  verUsuario(unbloeck:boolean) {
    this.unblock = unbloeck
    this.mostrarUsuario();
  }
  getRoles() {
    this.usuarioService.getRoles().subscribe(
      (data: ResultRole) => {
        this.listRoles = data.roles
      }
    )
  }

  crearEditarUsuario() {

    if (this.id === '') {
      const data = new FormData();

      data.append('nombre', this.usuarioForm.get('nombre')?.value);
      data.append('usuario', this.usuarioForm.get('usuario')?.value);
      data.append('password', this.usuarioForm.get('password')?.value);
      data.append('rol', this.usuarioForm.get('rol')?.value);
      this.usuarioService.postUsuario(data).subscribe(
        (data:ResultUser)=>{
          ToastSuccess('success',data.msg);
          this.mostrarUsuario();
          this.usuarioForm.setValue({
            nombre: '',
            usuario: '',
            password: '',
            rol: ''
          });
        },(error)=>{
          ToastSuccess('warning', error.error.errors[0].msg)
        }
      )
    }
    if (this.id !== '') {
      const data = new FormData();
      data.append('nombre', this.usuarioForm.get('nombre')?.value);
      data.append('usuario', this.usuarioForm.get('usuario')?.value);
      if (this.usuarioForm.get('password')?.value !== '') {
        data.append('password', this.usuarioForm.get('password')?.value);
      }
      data.append('rol', this.usuarioForm.get('rol')?.value);
      this.usuarioService.putUsuario(data, this.id).subscribe(
        (data:ResultUserIndi)=>{
          ToastSuccess('success',data.msg );
        },
        (error)=>{
          console.log(error);
          
        }
      )
      }
  }
  editarUsuario(ids: any) {
    this.id =ids;
    this.usuarioService.getUsuario(this.id).subscribe(
      (data:ResultUserIndi)=>{
        console.log(data);
        this.usuarioForm.setValue({
            nombre: data.usuario.nombre,
            usuario: data.usuario.usuario,
            password: '',
            rol: data.usuario.rol
        });
        this.titulo = 'Editar'
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }
  borrarUsuario(id: any,unblock:boolean) {

    Swal.fire({
      title: 'Estas seguro?',
      text: unblock ? 'Este usuario sera desbloqueado!!!' :'Este usuario sera bloqueado!!!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: unblock ? 'Si, desbloquear!' :'Si, bloquear!'
    }).then((result) => {
      this.usuarioService.deleteUsuario(id, unblock).subscribe(
        (data:ResultUser)=>{
          ToastSuccess('success', data.msg);
          this.mostrarUsuario();
          if (result.isConfirmed) {
            Swal.fire(
              unblock ? 'Desbloqueado' : 'Bloqueado',
              data.msg,
              'success'
            )
          }
        }
      )
    }) /*
    this.usuarioService.deleteUsuario(id, unblock).subscribe(
      (data:ResultUser)=>{
        ToastSuccess('success', data.msg);
        this.mostrarUsuario();
        
      }
    ) */

  }
  cancelar(){
    this.id ='',
    this.titulo ='Crear';
    this.usuarioForm.setValue({
      nombre: '',
      usuario: '',
      password: '',
      rol: ''
  });
  }
}
