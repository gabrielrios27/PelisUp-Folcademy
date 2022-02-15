import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { BurgerButtonComponent } from './burger-button/burger-button.component';

@NgModule({
  declarations: [HeaderComponent, NavbarComponent, FooterComponent, BurgerButtonComponent],
  imports: [CommonModule, SharedModule],
  exports: [HeaderComponent, NavbarComponent, FooterComponent],
})
export class LayoutModule {}
