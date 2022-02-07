import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards-conteiner',
  templateUrl: './cards-conteiner.component.html',
  styleUrls: ['./cards-conteiner.component.css'],
})
export class CardsConteinerComponent implements OnInit {
  @Input() filterCategorie: string = '';

  arrayToShow: any = [];
  arrayPelisUp: any = [
    {
      name: 'Black Widow',
      categorie: 'pelicula',
      img: 'BlackWidow.jpg',
      rating: 6.8,
    },
    {
      name: 'ShangChi',
      categorie: 'pelicula',
      img: 'ShangChi.jpg',
      rating: 7.9,
    },
    { name: 'Loki', categorie: 'pelicula', img: 'Loki.jpg', rating: 8.4 },
    {
      name: 'How I Met Your Mother',
      categorie: 'pelicula',
      img: 'HowIMetYourMother.jpg',
      rating: 8.3,
    },
    {
      name: 'Money Heist',
      categorie: 'serie',
      img: 'MoneyHeist.jpg',
      rating: 8.3,
    },
    { name: 'Friends', categorie: 'serie', img: 'Friends.jpg', rating: 8.8 },
    {
      name: 'The Big Bang Theory',
      categorie: 'serie',
      img: 'BigBangTheory.jpg',
      rating: 8.1,
    },
    {
      name: 'Two And a Half Men',
      categorie: 'serie',
      img: 'TwoAndAHalfMen.jpg',
      rating: 7,
    },
  ];
  constructor() {}

  ngOnInit(): void {
    if (
      this.filterCategorie === 'pelicula' ||
      this.filterCategorie === 'serie'
    ) {
      this.arrayToShow = this.arrayPelisUp.filter(
        (film: { categorie: string }) => film.categorie === this.filterCategorie
      );
    } else {
      this.arrayToShow = this.arrayPelisUp;
    }
  }
  OnChangeCategorie() {
    if (
      this.filterCategorie === 'pelicula' ||
      this.filterCategorie === 'serie'
    ) {
      this.arrayToShow = this.arrayPelisUp.filter(
        (film: { categorie: string }) => film.categorie === this.filterCategorie
      );
    } else {
      this.arrayToShow = this.arrayPelisUp;
    }
  }
}
