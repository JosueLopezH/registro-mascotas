import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';   // 👈 OBLIGATORIO PARA routerLink

import { ListaMascotasComponent } from './pages/lista-mascotas/lista-mascotas.component';
import { AltaMascotaComponent } from './pages/alta-mascota/alta-mascota.component';
import { EditarMascotaComponent } from './pages/editar-mascota/editar-mascota.component';
import { MascotasRoutingModule } from './mascotas-routing.module';

@NgModule({
  declarations: [
    ListaMascotasComponent,
    AltaMascotaComponent,
    EditarMascotaComponent
  ],
  imports: [
    CommonModule,
    MascotasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule       
  ]
})
export class MascotasModule { }
