import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/routes/home/home.component';
import { LoginComponent } from './components/routes/login/login.component';
import { Lost404Component } from './components/routes/lost404/lost404.component';
import { PeliculasComponent } from './components/routes/peliculas/peliculas.component';
import { SeriesComponent } from './components/routes/series/series.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: HomeComponent,
  },
  {
    path: 'series',
    component: SeriesComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'peliculas',
    component: PeliculasComponent,
  },
  {
    path: '**',
    component: Lost404Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
