import { NgModule } from '@angular/core';
import { SeriesRoutingModule } from './series-routing.module';
import { SeriesComponent } from './series.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [SeriesComponent],
  imports: [SeriesRoutingModule, SharedModule],
})
export class SeriesModule {}
