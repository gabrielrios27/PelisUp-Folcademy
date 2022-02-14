import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SeriesComponent } from './series/series.component';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { Lost404Component } from './lost404/lost404.component';

@NgModule({
  declarations: [
    PeliculasComponent,
    HomeComponent,
    LoginComponent,
    SeriesComponent,
    Lost404Component,
  ],
  imports: [CommonModule, SharedModule],
  exports: [HomeComponent, LoginComponent, SeriesComponent, PeliculasComponent],
})
export class RoutesModule {}
