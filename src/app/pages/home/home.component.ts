import { HtmlTagDefinition } from '@angular/compiler';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CardsConteinerComponent } from 'src/app/shared/cards-conteiner/cards-conteiner.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  OnClickCategorie(event: any) {
    let categorie = document.querySelectorAll('.categories__item');
    categorie.forEach((element) => {
      element.classList.remove('categories__item--active');
    });
    event.target.classList.add('categories__item--active');
  }

  @ViewChild(CardsConteinerComponent)
  hijo: CardsConteinerComponent = new CardsConteinerComponent();

  ngOnInit(): void {
    document.querySelectorAll('.categories__item');
  }

  OnClickAll() {
    this.hijo.OnChangeCategorie('');
  }
  OnClickMovies() {
    this.hijo.OnChangeCategorie('pelicula');
  }
  OnClickShows() {
    this.hijo.OnChangeCategorie('serie');
  }
}
