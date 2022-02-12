import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearcherComponent } from './searcher/searcher.component';
import { CardsConteinerComponent } from './cards-conteiner/cards-conteiner.component';
import { CardComponent } from './card/card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SearcherComponent, CardsConteinerComponent, CardComponent],
  imports: [CommonModule, RouterModule],
  exports: [
    CommonModule,
    SearcherComponent,
    CardComponent,
    CardsConteinerComponent,
    RouterModule,
  ],
})
export class SharedModule {}
