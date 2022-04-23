import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DarkModeService } from 'src/app/services/user/dark-mode.service';

import { MoviesService } from 'src/app/services/user/movies.service';
import {
  MediaType,
  PageMoviesSeriesActors,
  MoviesSeriesActors,
} from 'src/interfaces/NewUser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  moviesSeriesApi: MoviesSeriesActors[] = [];
  moviesSeriesApi_toSearch: MoviesSeriesActors[] = [];
  moviesSeriesApi_toShow: MoviesSeriesActors[] = [];
  totalPages: number = 0; /*numero total de paginas que se obtienen de la API*/
  numbersPages: number[] =
    []; /*arreglo de numeros del 1 al pagesToShow, si se quieren mostrar todas entonces en createNumbersPagesArray() cambiar pagesToShow por totalPages*/
  pagesToShow: number = 100; /*cantidad de peliculas a mostrar en la paginación*/
  pageSelected: number = 1;
  arrowPagination: number = 1;
  translatePaginationNumber: number = 0;
  translatePaginationString: string = '0px';

  selectedCategorie: string = 'Todos'; /*lo que se escribe en el HTML*/
  filter: string = 'Todos';

  toSearch: string = '';
  toSearchPrevius: string = '';
  quantity: number = 0;
  twoParts: Boolean = false;

  mediaType: MediaType = MediaType.Movie;
  userLocStg: any;
  userJSON: string | null = null;

  constructor(private _moviesService: MoviesService, private router: Router) {}
  ngOnInit(): void {
    this.OnClickAll();
    this.getLocalStorage();
    if (this.userLocStg) {
      this.router.navigate(['../dashboard']);
    }
    this.createNumbersPagesArray();
  }

  getLocalStorage() {
    /*Si hay en el local storage un usuario logeado lo guarda en 'user'*/
    this.userJSON = localStorage.getItem('Usuario');
    if (this.userJSON) {
      this.userLocStg = JSON.parse(this.userJSON);
    }
  }
  createNumbersPagesArray() {
    this.numbersPages = [];
    if (this.totalPages > this.pagesToShow) {
      for (let i = 1; i <= this.pagesToShow; i++) {
        this.numbersPages.push(i);
      }
    } else {
      for (let i = 1; i <= this.totalPages; i++) {
        this.numbersPages.push(i);
      }
    }
  }
  getTrending() {
    this._moviesService.getTrending(this.pageSelected).subscribe({
      next: (data: PageMoviesSeriesActors) => {
        let MoviesSeriesActorsApi = data.results;
        this.totalPages = data.total_pages;

        this.moviesSeriesApi = [];
        for (let film of MoviesSeriesActorsApi) {
          if (film.media_type !== 'person') {
            this.moviesSeriesApi.push(film);
          }
        }
        this.moviesSeriesApi_toShow = this.moviesSeriesApi;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.CountQuantity();
        this.createNumbersPagesArray();
        this.ReWriteAtFilterChange(this.toSearch);
        console.log('Request trending complete');
      },
    });
  }
  getMovies() {
    this._moviesService.getMovies(this.pageSelected).subscribe({
      next: (data: PageMoviesSeriesActors) => {
        this.moviesSeriesApi = data.results;
        this.totalPages = data.total_pages;
        this.moviesSeriesApi_toShow = this.moviesSeriesApi;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.CountQuantity();
        this.createNumbersPagesArray();
        this.ReWriteAtFilterChange(this.toSearch);
        console.log('Request movies complete');
      },
    });
  }
  getSeries() {
    this._moviesService.getSeries(this.pageSelected).subscribe({
      next: (data: PageMoviesSeriesActors) => {
        this.moviesSeriesApi = data.results;
        this.totalPages = data.total_pages;
        this.moviesSeriesApi_toShow = this.moviesSeriesApi;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.CountQuantity();
        this.createNumbersPagesArray();
        this.ReWriteAtFilterChange(this.toSearch);
        console.log('Request series complete');
      },
    });
  }
  getSearchTrending() {
    this._moviesService
      .getSearchTrending(this.pageSelected, this.toSearch)
      .subscribe({
        next: (data: PageMoviesSeriesActors) => {
          let MoviesSeriesActorsApi = data.results;
          this.totalPages = data.total_pages;

          this.moviesSeriesApi = [];
          for (let film of MoviesSeriesActorsApi) {
            if (film.media_type !== 'person') {
              this.moviesSeriesApi.push(film);
            }
          }
          this.moviesSeriesApi_toShow = this.moviesSeriesApi;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.CountQuantity();
          this.createNumbersPagesArray();
          console.log('Request trending to search complete');
        },
      });
  }
  getSearchMovies() {
    this._moviesService
      .getSearchMovie(this.pageSelected, this.toSearch)
      .subscribe({
        next: (data: PageMoviesSeriesActors) => {
          this.moviesSeriesApi = data.results;
          this.totalPages = data.total_pages;
          this.moviesSeriesApi_toShow = this.moviesSeriesApi;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.CountQuantity();
          this.createNumbersPagesArray();
          console.log('Request movies to search complete');
        },
      });
  }
  getSearchSeries() {
    this._moviesService
      .getSearchSerie(this.pageSelected, this.toSearch)
      .subscribe({
        next: (data: PageMoviesSeriesActors) => {
          this.moviesSeriesApi = data.results;
          this.totalPages = data.total_pages;
          this.moviesSeriesApi_toShow = this.moviesSeriesApi;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.CountQuantity();
          this.createNumbersPagesArray();
          console.log('Request series to search complete');
        },
      });
  }
  /*para buscar la informacion del input dentro de las cards mostradas en el home*/
  SearchInParent(e: string) {
    /*informacion a buscar, que viene desde el componente searcher*/
    this.toSearch = e;

    // lo siguiente se hace para volver la paginación a la pagina 1 cada vez que se busca algo
    this.arrowPagination = 1;
    this.translatePaginationNumber = 0;
    this.translatePaginationString = '0px';
    this.pageSelected = 1;

    /*vacío el arreglo en donde guardaremos las peliculas que coincidan con la busqueda */
    this.moviesSeriesApi_toSearch = [];
    if (e !== '') {
      if (this.filter == 'Todos') {
        this.getSearchTrending();
      }
      if (this.filter == 'Películas') {
        this.getSearchMovies();
      }
      if (this.filter == 'Series') {
        this.getSearchSeries();
      }
    } else {
      /*si el input de busqueda esta vacio se muestra el arreglo de todas las peliculas*/
      if (this.filter == 'Todos') {
        this.getTrending();
      }
      if (this.filter == 'Películas') {
        this.getMovies();
      }
      if (this.filter == 'Series') {
        this.getSeries();
      }
    }
    /*se calcula la cantidad de peliculas o series mostradas*/
    this.quantity = this.moviesSeriesApi_toShow.length;
  }
  ReWriteAtFilterChange(toSearch: string) {
    let toSearchPart: string = '';
    for (let i = 0; i < toSearch.length; i++) {
      toSearchPart = toSearchPart.concat(toSearch[i]);
      this.SearchInParent(toSearchPart);
    }
  }

  OnClickAll() {
    this.getTrending();
    this.filter = 'Todos';
  }
  OnClickMovies() {
    this.getMovies();
    this.filter = 'Películas';
    this.mediaType = MediaType.Movie;
  }
  OnClickShows() {
    this.getSeries();
    this.filter = 'Series';
    this.mediaType = MediaType.Tv;
  }
  /*CountQuantity: se calcula la cantidad de peliculas o series mostradas*/
  CountQuantity() {
    this.quantity = this.moviesSeriesApi_toShow.length;
  }
  /*TwoPartsSearch: cuando no hay coincidencias con lo escrito en el input entonces este valor(del input,toSearch) se divide en dos desde la ultima coincidencia y se buscan ambas partes en el arreglo de peliculas y series */

  onClickPage(page: number) {
    this.pageSelected = page;
    if (this.toSearch == '') {
      if (this.filter == 'Todos') {
        this.getTrending();
      }
      if (this.filter == 'Películas') {
        this.getMovies();
      }
      if (this.filter == 'Series') {
        this.getSeries();
      }
    } else {
      if (this.filter == 'Todos') {
        this.getSearchTrending();
      }
      if (this.filter == 'Películas') {
        this.getSearchMovies();
      }
      if (this.filter == 'Series') {
        this.getSearchSeries();
      }
    }
  }
  onClickRightArrowPagination() {
    if (this.arrowPagination < 17) {
      this.translatePaginationNumber = this.arrowPagination * -205;
      this.translatePaginationString = `${this.translatePaginationNumber}px`;
      this.arrowPagination++;
    }
  }
  onClickLeftArrowPagination() {
    if (this.arrowPagination > 0) {
      this.arrowPagination--;
      this.translatePaginationNumber = this.translatePaginationNumber + 205;
      this.translatePaginationString = `${this.translatePaginationNumber}px`;
    }
  }
}
