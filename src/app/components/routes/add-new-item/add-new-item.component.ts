import { Component, OnInit } from '@angular/core';
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

  selectedCategorie: string = 'Todos'; /*lo que se escribe en el HTML*/
  filter: string = 'Todos';

  toSearch: string = '';
  toSearchPrevius: string = '';
  quantity: number = 0;
  twoParts: Boolean = false;

  mediaType: MediaType = MediaType.Movie;
  userLocStg: any;
  userJSON: string | null = null;
  myMovies: any;
  mySeries: any;

  constructor(private _moviesService: MoviesService) {}

  ngOnInit(): void {
    this.OnClickAll();
    this.getLocalStorage();
    this.getMyList(this.myMovies, MediaType.Movie);
    this.getMyList(this.mySeries, MediaType.Tv);
  }

  getTrending() {
    this._moviesService.getTrending().subscribe({
      next: (data: PageMoviesSeriesActors) => {
        let MoviesSeriesActorsApi = data.results;
        this.moviesSeriesApi = [];
        for (let film of MoviesSeriesActorsApi) {
          if (film.media_type !== 'person') {
            this.moviesSeriesApi.push(film);
          }
        }
        this.moviesSeriesApi_toShow = this.moviesSeriesApi;
        console.log(this.moviesSeriesApi);
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
    this._moviesService.getMovies().subscribe({
      next: (data: PageMoviesSeriesActors) => {
        this.moviesSeriesApi = data.results;
        this.moviesSeriesApi_toShow = this.moviesSeriesApi;
        console.log(this.moviesSeriesApi);
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
    this._moviesService.getSeries().subscribe({
      next: (data: PageMoviesSeriesActors) => {
        this.moviesSeriesApi = data.results;
        this.moviesSeriesApi_toShow = this.moviesSeriesApi;
        console.log(this.moviesSeriesApi);
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
          this.checkMatches();
        },
        (error) => {
          console.log('falló la peticion de mylist', error);
        }
      );
  }
  getLocalStorage() {
    /*Si hay en el local storage un usuario logeado lo guarda en 'user'*/
    this.userJSON = localStorage.getItem('Usuario');
    if (this.userJSON) {
      this.userLocStg = JSON.parse(this.userJSON);
    }
  }
  checkMatches() {
    for (let item of this.moviesSeriesApi_toShow) {
      if (item.name) {
        for (let serie of this.mySeries) {
          if (item.name == serie.name) {
            item.added = true;
          }
        }
      } else if (item.title) {
        for (let movie of this.myMovies) {
          if (item.title == movie.title) {
            item.added = true;
          } else {
            item.added = false;
          }
        }
      }
    }
  }
}
