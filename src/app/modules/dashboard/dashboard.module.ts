import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomeComponent, DashboardComponent],
  imports: [CommonModule, RouterModule],
})
export class DashboardModule {}
