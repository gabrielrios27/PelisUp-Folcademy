import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearcherComponent } from './searcher/searcher.component';

import { CardComponent } from './card/card.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SearcherComponent, CardComponent],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [CommonModule, SearcherComponent, CardComponent, RouterModule],
})
export class SharedModule {}
