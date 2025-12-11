import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'mascotas',
    loadChildren: () =>
      import('./features/mascotas/mascotas.module')
        .then(m => m.MascotasModule)
  },
  { path: '', redirectTo: 'mascotas', pathMatch: 'full' },
  { path: '**', redirectTo: 'mascotas' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
