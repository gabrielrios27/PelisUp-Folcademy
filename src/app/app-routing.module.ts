import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/routes/dashboard/dashboard.component';
import { DetailPageComponent } from './components/routes/detail-page/detail-page.component';
import { HomeComponent } from './components/routes/home/home.component';
import { LoginComponent } from './components/routes/login/login.component';
import { Lost404Component } from './components/routes/lost404/lost404.component';
import { PeliculasComponent } from './components/routes/peliculas/peliculas.component';
import { RegisterComponent } from './components/routes/register/register.component';
import { SeriesComponent } from './components/routes/series/series.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: HomeComponent,
  },
  {
    path: '',
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
    path: 'login/register',
    component: RegisterComponent,
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'peliculas',
    component: PeliculasComponent,
  },
  {
    path: ':mediaType/:id',
    component: DetailPageComponent,
  },
  {
    path: 'inicio/:mediaType/:id',
    component: DetailPageComponent,
  },
  {
    path: 'peliculas/:mediaType/:id',
    component: DetailPageComponent,
  },
  {
    path: 'series/:mediaType/:id',
    component: DetailPageComponent,
  },
  {
    path: '**',
    component: Lost404Component,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
