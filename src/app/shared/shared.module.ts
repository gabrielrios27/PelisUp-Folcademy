import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearcherComponent } from './searcher/searcher.component';
import { CardComponent } from './card/card.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    SearcherComponent,
    CardComponent,
    HeaderComponent,
    NavbarComponent,
  ],
  imports: [],
  exports: [
    CommonModule,
    SearcherComponent,
    CardComponent,
    HeaderComponent,
    NavbarComponent,
  ],
})
export class SharedModule {}
