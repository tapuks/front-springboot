import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardRoutingModule } from './modules/dashboard/dashboard-routing-module';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true, useHash: false }),
    DashboardRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
