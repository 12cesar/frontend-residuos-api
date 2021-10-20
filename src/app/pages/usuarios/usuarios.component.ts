import { Component, OnInit } from '@angular/core';
import { UsuarioAdminService } from './usuario-admin.service';
import { ResultUser, Usuario } from '../../interfaces/user-interface';
import Swal from 'sweetalert2';
import { cargandoLoad, closeAlert } from '../../function/cargando';
import { ResultRole, Role } from '../../interfaces/role-interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Toast } from '../../function/validarpost';

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
  usuarioForm: FormGroup
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

  mostrarUsuario(unblock: boolean = true) {
    this.usuarioService.getUsuario(unblock).subscribe(
      (data: ResultUser) => {
        this.cargando = true;
        this.listUsuario = data.usuario;
        cargandoLoad('Cargando Usuarios')
        this.cargando = false;
        if (this.cargando === false) {
          closeAlert();
        }


      }
    )
  }

  verUsuario(unblock: boolean) {
    this.mostrarUsuario(unblock);
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

      Toast('hola')
    }
  }
  editarUsuario(id: any) {
    console.log(id);

  }
  borrarUsuario(id: any) {
    console.log(id);

  }

}
