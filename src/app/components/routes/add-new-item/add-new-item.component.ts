import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
export class AddNewItemComponent implements OnInit {
  moviesSeriesApi: MoviesSeriesActors[] = [];
  moviesSeriesApi_toSearch: MoviesSeriesActors[] = [];
  moviesSeriesApi_toShow: MoviesSeriesActors[] = [];
  totalPages: number = 0; /*numero total de paginas que se obtienen de la API*/
  numbersPages: number[] =
    []; /*arreglo de numeros del 1 al pagesToShow, si se quieren mostrar todas entonces en createNumbersPagesArray() cambiar pagesToShow por totalPages*/
  pagesToShow: number = 100; /*cantidad de peliculas a mostrar en la paginación*/
  pageSelected: number = 1;

  selectedCategorie: string = 'Todos'; /*lo que se escribe en el HTML*/
  filter: string = 'Todos';

  toSearch: string = '';
  toSearchPrevius: string = '';
  quantity: number = 0;
  twoParts: Boolean = false;

  mediaType: MediaType = MediaType.Movie;
  userLocStg: any;
  userJSON: string | null = null;
  myMovies: any[] = [];
  mySeries: any[] = [];

  constructor(private _moviesService: MoviesService, private router: Router) {}

  ngOnInit(): void {
    this.getLocalStorage();
    if (!this.userLocStg) {
      this.router.navigate(['../inicio']);
    }
    this.OnClickAll();
    this.createNumbersPagesArray();
  }
  createNumbersPagesArray() {
    for (let i = 1; i <= this.pagesToShow; i++) {
      this.numbersPages.push(i);
    }
    console.log(this.numbersPages);
  }
  getTrending() {
    this._moviesService.getTrending(this.pageSelected).subscribe({
      next: (data: PageMoviesSeriesActors) => {
        let MoviesSeriesActorsApi = data.results;
        this.moviesSeriesApi = [];
        for (let film of MoviesSeriesActorsApi) {
          if (film.media_type !== 'person') {
            this.moviesSeriesApi.push(film);
          }
        }
        this.moviesSeriesApi_toShow = this.moviesSeriesApi;
        this.getMyList(this.myMovies, MediaType.Movie);
        this.getMyList(this.mySeries, MediaType.Tv);
        console.log(this.moviesSeriesApi_toShow);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.CountQuantity();
        this.ReWriteAtFilterChange(this.toSearch);
        console.log('Request trending complete');
      },
    });
  }
  getMovies() {
    this._moviesService.getMovies(this.pageSelected).subscribe({
      next: (data: PageMoviesSeriesActors) => {
        this.moviesSeriesApi = data.results;
        this.moviesSeriesApi_toShow = this.moviesSeriesApi;
        this.getMyList(this.myMovies, MediaType.Movie);
        this.getMyList(this.mySeries, MediaType.Tv);
        console.log(this.moviesSeriesApi_toShow);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.CountQuantity();
        this.ReWriteAtFilterChange(this.toSearch);
        console.log('Request movies complete');
      },
    });
  }
  getSeries() {
    this._moviesService.getSeries(this.pageSelected).subscribe({
      next: (data: PageMoviesSeriesActors) => {
        this.moviesSeriesApi = data.results;
        this.moviesSeriesApi_toShow = this.moviesSeriesApi;
        this.getMyList(this.myMovies, MediaType.Movie);
        this.getMyList(this.mySeries, MediaType.Tv);
        console.log(this.moviesSeriesApi_toShow);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.CountQuantity();
        this.ReWriteAtFilterChange(this.toSearch);
        console.log('Request series complete');
      },
    });
  }

  /*para buscar la informacion del input dentro de las cards mostradas en el home*/
  SearchInParent(e: string) {
    /*informacion a buscar, que viene desde el componente searcher*/
    this.toSearch = e.toUpperCase();

    /*vacío el arreglo en donde guardaremos las peliculas que coincidan con la busqueda */
    this.moviesSeriesApi_toSearch = [];

    for (let film of this.moviesSeriesApi) {
      if (film.title) {
        if (film.title.toUpperCase().includes(this.toSearch)) {
          /*si la pelicula incluye la cadena de texto a buscar entonces se guarda en el nuevo arreglo */
          this.moviesSeriesApi_toSearch.push(film);
          this.twoParts = false;
        }
      } else if (film.name) {
        if (film.name.toUpperCase().includes(this.toSearch)) {
          /*si la pelicula incluye la cadena de texto a buscar entonces se guarda en el nuevo arreglo */
          this.moviesSeriesApi_toSearch.push(film);
          this.twoParts = false;
        }
      }
    }
    if (e !== '') {
      /*si el input no esta vacio se muestra el arreglo de peliculas que coinciden con la busqueda*/
      this.TwoPartsSearch();
    } else {
      /*si el input esta vacio se muestra el arreglo de todas las peliculas*/
      this.moviesSeriesApi_toShow = this.moviesSeriesApi;
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
  TwoPartsSearch() {
    if (this.moviesSeriesApi_toSearch.length == 0 || this.twoParts) {
      this.twoParts = true;
      let toSearchPreviusLength = this.toSearchPrevius.length;
      let toSearchOne: string = this.toSearchPrevius;
      let toSearchTwo: string = this.toSearch.substring(toSearchPreviusLength);

      for (let film of this.moviesSeriesApi) {
        if (film.title) {
          if (
            film.title.toUpperCase().includes(toSearchOne) &&
            film.title.toUpperCase().includes(toSearchTwo)
          ) {
            /*si la pelicula incluye las cadenas de texto a buscar entonces se guarda en el arreglo */
            this.moviesSeriesApi_toSearch.push(film);
          }
        } else if (film.name) {
          if (
            film.name.toUpperCase().includes(toSearchOne) &&
            film.name.toUpperCase().includes(toSearchTwo)
          ) {
            /*si la pelicula incluye las cadenas de texto a buscar entonces se guarda en el arreglo */
            this.moviesSeriesApi_toSearch.push(film);
          }
        }
      }
      this.moviesSeriesApi_toShow = this.moviesSeriesApi_toSearch;
    } else {
      this.twoParts = false;
      this.moviesSeriesApi_toShow = this.moviesSeriesApi_toSearch;
      this.toSearchPrevius =
        this.toSearch; /*se guarda la ultima palabra buscada con la que hubo coincidencias */
    }
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
          console.log('array de peliculas o series', array);
          this.checkMatches(array);
        },
        (error) => {
          console.log('falló la peticion de mylist', error);
        }
      );
  }
  // obtengo del local storage el usuario para usar el user.uid
  getLocalStorage() {
    /*Si hay en el local storage un usuario logeado lo guarda en 'user'*/
    this.userJSON = localStorage.getItem('Usuario');
    if (this.userJSON) {
      this.userLocStg = JSON.parse(this.userJSON);
    }
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
}
