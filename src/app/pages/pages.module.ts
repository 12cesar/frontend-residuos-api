import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MensajesComponent } from './mensajes/mensajes.component';
import { MultasComponent } from './multas/multas.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { AlertaComponent } from './alerta/alerta.component';
import { AnuncioComponent } from './anuncio/anuncio.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ChartsModule } from 'ng2-charts';
import { GraficalineComponent } from './graficaline/graficaline.component';
import { CuadrodatosComponent } from './cuadrodatos/cuadrodatos.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    UsuariosComponent,
    MensajesComponent,
    MultasComponent,
    VehiculosComponent,
    AlertaComponent,
    AnuncioComponent,
    ClienteComponent,
    GraficalineComponent,
    CuadrodatosComponent
  ],
  exports:[
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ChartsModule
  ]
})
export class PagesModule { }
