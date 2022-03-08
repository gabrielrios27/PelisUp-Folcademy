import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SeriesComponent } from './series/series.component';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { Lost404Component } from './lost404/lost404.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    PeliculasComponent,
    HomeComponent,
    LoginComponent,
    SeriesComponent,
    Lost404Component,
    DetailPageComponent,
    DashboardComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [
    HomeComponent,
    LoginComponent,
    SeriesComponent,
    PeliculasComponent,
    DashboardComponent,
  ],
})
export class RoutesModule {}
