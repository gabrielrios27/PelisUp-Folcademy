import { HtmlTagDefinition } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  selectedCategorie: string = '';
  constructor() {}
  OnClickCategorie(event: any) {
    let categorie = document.querySelectorAll('.categories__item');
    categorie.forEach((element) => {
      element.classList.remove('categories__item--active');
    });
    event.target.classList.add('categories__item--active');
  }
  ngOnInit(): void {
    document.querySelectorAll('.categories__item');
  }
  OnClickAll() {
    this.selectedCategorie = '';
  }
  OnClickMovies() {
    this.selectedCategorie = 'pelicula';
  }
  OnClickShows() {
    this.selectedCategorie = 'serie';
  }
}
