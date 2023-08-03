import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MoviesService } from 'src/app/services/user/movies.service';
import {
  MediaType,
  PageMoviesSeriesActors,
  MoviesSeriesActors,
} from 'src/interfaces/NewUser';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css'],
})
export class SeriesComponent implements OnInit {
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

  filter: string = 'Películas';

  toSearch: string = '';
  quantity: number = 0;

  mediaType: MediaType = MediaType.Tv;
  userLocStg: any;
  userJSON: string | null = null;
  // suscripciones
  onDestroy$: Subject<boolean> = new Subject();
  constructor(private _moviesService: MoviesService, private router: Router) {}

  ngOnInit(): void {
    this.getSeries();
    this.getLocalStorage();
    if (this.userLocStg) {
      this.router.navigate(['../addNewItem']);
    }
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
  getSeries() {
    this._moviesService
      .getType(this.pageSelected, 'Series')
      .pipe(takeUntil(this.onDestroy$))
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
          console.log('Request series complete');
        },
      });
  }
  getSearchSeries() {
    this._moviesService
      .getSearchType(this.pageSelected, this.toSearch, 'Series')
      .pipe(takeUntil(this.onDestroy$))
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
    this.toSearch = e.toUpperCase();
    // lo siguiente se hace para volver la paginación a la pagina 1 cada vez que se busca algo
    this.arrowPagination = 1;
    this.translatePaginationNumber = 0;
    this.translatePaginationString = '0px';
    this.pageSelected = 1;
    /*vacío el arreglo en donde guardaremos las peliculas que coincidan con la busqueda */
    this.moviesSeriesApi_toSearch = [];

    if (e !== '') {
      this.getSearchSeries();
    } else {
      /*si el input de busqueda esta vacio se muestra el arreglo de todas las peliculas*/

      this.getSeries();
    }
    /*se calcula la cantidad de peliculas o series mostradas*/
    this.CountQuantity();
  }

  /*CountQuantity: se calcula la cantidad de peliculas o series mostradas*/
  CountQuantity() {
    this.quantity = this.moviesSeriesApi_toShow.length;
  }
  /*TwoPartsSearch: cuando no hay coincidencias con lo escrito en el input entonces este valor(del input,toSearch) se divide en dos desde la ultima coincidencia y se buscan ambas partes en el arreglo de peliculas y series */

  onClickPage(page: number) {
    this.pageSelected = page;
    if (this.toSearch == '') {
      this.getSeries();
    } else {
      this.getSearchSeries();
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
  ngOnDestroy() {
    this.onDestroy$.next(true);
  }
}
