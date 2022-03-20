import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MoviesService } from 'src/app/services/user/movies.service';
import {
  MediaType,
  MoviesSeriesActors,
  MoviesSeriesActorsUser,
  PageMoviesSeriesActors,
} from 'src/interfaces/NewUser';

@Component({
  selector: 'app-my-films',
  templateUrl: './my-films.component.html',
  styleUrls: ['./my-films.component.css'],
})
export class MyFilmsComponent implements OnInit {
  moviesSeries: MoviesSeriesActors[] = [];
  moviesSeries_toSearch: MoviesSeriesActors[] = [];
  moviesSeries_toShow: MoviesSeriesActors[] = [];

  selectedCategorie: string = 'Todos'; /*lo que se escribe en el HTML*/
  filter: string = 'Todos';

  toSearch: string = '';
  toSearchPrevius: string = '';
  quantity: number = 0;
  twoParts: Boolean = false;

  myMovies: any[] = [];
  mySeries: any[] = [];

  // ---------------------------------------------------
  userLocStg: any;
  userJSON: string | null = null;
  categorie: string;
  mediaType: MediaType = MediaType.Movie;
  myFilms: any[] = [];

  constructor(
    private rutaActiva: ActivatedRoute,
    private _moviesService: MoviesService
  ) {
    this.categorie = '';
  }

  ngOnInit(): void {
    this.getLocalStorage();
    let categorieSelected;
    this.rutaActiva.paramMap.subscribe((params: ParamMap) => {
      categorieSelected = params.get('categorie');
    });
    if (categorieSelected) {
      this.categorie = categorieSelected;
    }
    console.log('la categoria elegida es: ', this.categorie);
    if (this.categorie == 'Películas') {
      this.mediaType = MediaType.Movie;
    } else {
      this.mediaType = MediaType.Tv;
    }
    this.getMyList(this.moviesSeries, this.mediaType);
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
          console.log('array de my films', array);
          this.moviesSeries_toShow = array;
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

  /*para buscar la informacion del input dentro de las cards mostradas en el home*/
  SearchInParent(e: string) {
    /*informacion a buscar, que viene desde el componente searcher*/
    this.toSearch = e.toUpperCase();

    /*vacío el arreglo en donde guardaremos las peliculas que coincidan con la busqueda */
    this.moviesSeries_toSearch = [];

    for (let film of this.moviesSeries) {
      if (film.title) {
        if (film.title.toUpperCase().includes(this.toSearch)) {
          /*si la pelicula incluye la cadena de texto a buscar entonces se guarda en el nuevo arreglo */
          this.moviesSeries_toSearch.push(film);
          this.twoParts = false;
        }
      } else if (film.name) {
        if (film.name.toUpperCase().includes(this.toSearch)) {
          /*si la pelicula incluye la cadena de texto a buscar entonces se guarda en el nuevo arreglo */
          this.moviesSeries_toSearch.push(film);
          this.twoParts = false;
        }
      }
    }
    if (e !== '') {
      /*si el input no esta vacio se muestra el arreglo de peliculas que coinciden con la busqueda*/
      this.TwoPartsSearch();
    } else {
      /*si el input esta vacio se muestra el arreglo de todas las peliculas*/
      this.moviesSeries_toShow = this.moviesSeries;
    }
  }

  /*TwoPartsSearch: cuando no hay coincidencias con lo escrito en el input entonces este valor(del input,toSearch) se divide en dos desde la ultima coincidencia y se buscan ambas partes en el arreglo de peliculas y series */
  TwoPartsSearch() {
    if (this.moviesSeries_toSearch.length == 0 || this.twoParts) {
      this.twoParts = true;
      let toSearchPreviusLength = this.toSearchPrevius.length;
      let toSearchOne: string = this.toSearchPrevius;
      let toSearchTwo: string = this.toSearch.substring(toSearchPreviusLength);

      for (let film of this.moviesSeries) {
        if (film.title) {
          if (
            film.title.toUpperCase().includes(toSearchOne) &&
            film.title.toUpperCase().includes(toSearchTwo)
          ) {
            /*si la pelicula incluye las cadenas de texto a buscar entonces se guarda en el arreglo */
            this.moviesSeries_toSearch.push(film);
          }
        } else if (film.name) {
          if (
            film.name.toUpperCase().includes(toSearchOne) &&
            film.name.toUpperCase().includes(toSearchTwo)
          ) {
            /*si la pelicula incluye las cadenas de texto a buscar entonces se guarda en el arreglo */
            this.moviesSeries_toSearch.push(film);
          }
        }
      }
      this.moviesSeries_toShow = this.moviesSeries_toSearch;
    } else {
      this.twoParts = false;
      this.moviesSeries_toShow = this.moviesSeries_toSearch;
      this.toSearchPrevius =
        this.toSearch; /*se guarda la ultima palabra buscada con la que hubo coincidencias */
    }
  }
}
