import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearcherComponent } from './searcher/searcher.component';
import { CardsConteinerComponent } from './cards-conteiner/cards-conteiner.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [SearcherComponent, CardsConteinerComponent, CardComponent],
  imports: [CommonModule],
  exports: [
    CommonModule,
    SearcherComponent,
    CardComponent,
    CardsConteinerComponent,
  ],
})
export class SharedModule {}
