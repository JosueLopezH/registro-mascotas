import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListaMascotasComponent } from './pages/lista-mascotas/lista-mascotas.component';
import { AltaMascotaComponent } from './pages/alta-mascota/alta-mascota.component';
import { EditarMascotaComponent } from './pages/editar-mascota/editar-mascota.component';

const routes: Routes = [
  { path: '', component: ListaMascotasComponent },
  { path: 'alta', component: AltaMascotaComponent },
  { path: 'editar/:id', component: EditarMascotaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MascotasRoutingModule {}
