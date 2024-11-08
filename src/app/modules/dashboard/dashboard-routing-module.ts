import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./routing-child-module').then((m) => m.RouterChildModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
