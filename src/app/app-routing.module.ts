import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagosComponent } from './components/pago/pagos/pagos.component';
import { Page404Component } from './components/page404/page404.component';
import { ResumenComponent } from './components/pago/resumen/resumen.component';

const routes: Routes = [
  { path: 'pagos/:id_pv_cero', component: PagosComponent },
  { path: 'resumen', component: ResumenComponent },
  { path: '404', component: Page404Component },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
