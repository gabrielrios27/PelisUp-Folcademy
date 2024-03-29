import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MoviesService } from 'src/app/services/user/movies.service';
import {
  MediaType,
  PageMoviesSeriesActors,
  MoviesSeriesActors,
  MoviesSeriesActorsUser,
} from 'src/interfaces/NewUser';

@Component({
  selector: 'app-add-new-item',
  templateUrl: './add-new-item.component.html',
  styleUrls: ['./add-new-item.component.css'],
})
export class AddNewItemComponent implements OnInit, OnDestroy {
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

  filter: string = 'Todos';

  toSearch: string = '';
  quantity: number = 0;

  mediaType: MediaType = MediaType.Movie;
  userLocStg: any;
  userJSON: string | null = null;
  myMovies: any[] = [];
  mySeries: any[] = [];
  // suscripciones
  onDestroy$: Subject<boolean> = new Subject();

  constructor(private _moviesService: MoviesService, private router: Router) {}

  ngOnInit(): void {
    this.OnClickType('Todos');
    this.getLocalStorage();
    if (!this.userLocStg) {
      this.router.navigate(['../inicio']);
    }
  }
  // obtengo del local storage el usuario para usar el user.uid
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
  getType(type: string) {
    this._moviesService
      .getType(this.pageSelected, type)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data: PageMoviesSeriesActors) => {
          if (type === 'Todos') {
            let MoviesSeriesActorsApi = data.results;
            this.moviesSeriesApi = [];
            for (let film of MoviesSeriesActorsApi) {
              if (film.media_type !== 'person') {
                this.moviesSeriesApi.push(film);
              }
            }
          } else if (type === 'Películas' || type === 'Series') {
            this.moviesSeriesApi = data.results;
          } else {
            console.log(
              'error en la petición en home, type solo puede ser Todos, Películas o Series'
            );
          }
          this.totalPages = data.total_pages;
          this.moviesSeriesApi_toShow = this.moviesSeriesApi;
          this.getMyList(this.myMovies, MediaType.Movie);
          this.getMyList(this.mySeries, MediaType.Tv);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.CountQuantity();
          this.createNumbersPagesArray();
          // this.ReWriteAtFilterChange(this.toSearch);
          console.log('Request trending complete');
        },
      });
  }

  getSearchType(type: string) {
    this._moviesService
      .getSearchType(this.pageSelected, this.toSearch, type)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data: PageMoviesSeriesActors) => {
          if (type === 'Todos') {
            let MoviesSeriesActorsApi = data.results;
            this.moviesSeriesApi = [];
            for (let film of MoviesSeriesActorsApi) {
              if (film.media_type !== 'person') {
                this.moviesSeriesApi.push(film);
              }
            }
          } else if (type === 'Películas' || type === 'Series') {
            this.moviesSeriesApi = data.results;
          } else {
            console.log(
              'error en la petición en home, type solo puede ser Todos, Películas o Series'
            );
          }
          this.totalPages = data.total_pages;
          this.moviesSeriesApi_toShow = this.moviesSeriesApi;
          this.getMyList(this.myMovies, MediaType.Movie);
          this.getMyList(this.mySeries, MediaType.Tv);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.CountQuantity();
          this.createNumbersPagesArray();
          console.log(`Request ${type} complete`);
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
      this.getSearchType(this.filter);
    } else {
      /*si el input de busqueda esta vacio se muestra el arreglo de todas las peliculas*/
      this.getType(this.filter);
    }

    /*se calcula la cantidad de peliculas o series mostradas*/
    this.quantity = this.moviesSeriesApi_toShow.length;
  }
  OnClickType(type: string) {
    this.filter = type;
    this.SearchInParent(this.toSearch);
  }

  /*CountQuantity: se calcula la cantidad de peliculas o series mostradas*/
  CountQuantity() {
    this.quantity = this.moviesSeriesApi_toShow.length;
  }

  // obtengo los arreglos del firestore y busco coincidencias en el arreglo a mostrar para saber si el item ya esta agregado a firestore
  getMyList(array: any, mediaType: MediaType) {
    this._moviesService
      .getFromFirestore(this.userLocStg.uid, mediaType)
      .subscribe(
        (resp) => {
          array = [];
          resp.forEach((element: any) => {
            array.push({
              idGlobal: element.payload.doc.id,
              ...element.payload.doc.data(),
            });
          });
          this.checkMatches(array);
        },
        (error) => {
          console.log('falló la peticion de mylist', error);
        }
      );
  }

  // busco coincidencias en los arreglos de peliculas(.title) y series(.name), si hay coincidencia se agrega al item added=true
  checkMatches(array: MoviesSeriesActorsUser[]) {
    for (let item of this.moviesSeriesApi_toShow) {
      if (item.name) {
        for (let serie of array) {
          if (item.name == serie.name) {
            item.added = true;
            item.idGlobal = serie.idGlobal;
          }
        }
      } else if (item.title) {
        for (let movie of array) {
          if (item.title == movie.title) {
            item.added = true;
            item.idGlobal = movie.idGlobal;
          }
        }
      }
    }
  }
  onClickPage(page: number) {
    this.pageSelected = page;
    if (this.toSearch == '') {
      this.getType(this.filter);
    } else {
      this.getSearchType(this.filter);
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
