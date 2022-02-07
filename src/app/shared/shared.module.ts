import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearcherComponent } from './searcher/searcher.component';
import { CardComponent } from './card/card.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CardsConteinerComponent } from './cards-conteiner/cards-conteiner.component';

@NgModule({
  declarations: [
    SearcherComponent,
    CardComponent,
    HeaderComponent,
    NavbarComponent,
    CardsConteinerComponent,
  ],
  imports: [CommonModule],
  exports: [
    CommonModule,
    SearcherComponent,
    CardComponent,
    HeaderComponent,
    NavbarComponent,
    CardsConteinerComponent,
  ],
})
export class SharedModule {}
