import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { AlertaComponent } from './alerta/alerta.component';
import { AnuncioComponent } from './anuncio/anuncio.component';
import { ClienteComponent } from './cliente/cliente.component';
import { AuthGuard } from '../guard/auth.guard';
import { ConduccionComponent } from './conduccion/conduccion.component';
import { UbicacionComponent } from './ubicacion/ubicacion.component';
import { MultasComponent } from './multas/multas.component';


const routes: Routes = [

    {
        path: 'dashboard',
        component: PagesComponent,
        children:[
          {
            path: '',
            component: DashboardComponent,
          },
          {
            path: 'usuarios',
            component: UsuariosComponent,
          },
          {
            path: 'mensajes',
            component: MensajesComponent,
          },
          {
            path: 'vehiculos',
            component: VehiculosComponent,
          },
          {
            path: 'alerta',
            component: AlertaComponent,
          },
          {
            path: 'anuncios',
            component: AnuncioComponent,
          },
          {
            path: 'clientes',
            component: ClienteComponent,
          },
          {
            path: 'conduccion',
            component: ConduccionComponent,
          },
          {
            path: 'ubicacion',
            component: UbicacionComponent,
          },
          {
            path: 'multas',
            component: MultasComponent,
          },
          {
            path: 'progress',
            component: ProgressComponent,
          },
          {
            path: 'grafica1',
            component: Grafica1Component,
          },
        ],
        canActivateChild:[
          AuthGuard
        ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
