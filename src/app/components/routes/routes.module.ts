import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SeriesComponent } from './series/series.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, LayoutModule],
  exports: [HomeComponent, LoginComponent, SeriesComponent],
})
export class RoutesModule {}
