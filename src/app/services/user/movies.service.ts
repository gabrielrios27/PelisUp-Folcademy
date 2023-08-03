import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Movie,
  PageMoviesSeriesActors,
  Serie,
  MediaType,
  MoviesSeriesActorsBase,
  MoviesSeriesActorsUser,
} from 'src/interfaces/NewUser';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  api_key: string = '0167913abe154169ea9d85e3e8a3e7da';
  baseUrl: string = 'https://api.themoviedb.org/3';
  headers = new HttpHeaders().set(
    'Authorization',
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTY3OTEzYWJlMTU0MTY5ZWE5ZDg1ZTNlOGEzZTdkYSIsInN1YiI6IjYyMTU0ZWRhMGU0ZmM4MDA0NDExNjZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8-i63xqhXGI5bCPXp0dWpPktcxIJt_CUToTH5Sneyc8'
  ); //token para la autorización de la API de TMBD version 4

  idFilmToShowDetails: number = 0;
  mediaType: MediaType = MediaType.Movie;
  data: MoviesSeriesActorsUser = {} as MoviesSeriesActorsUser;

  constructor(private _http: HttpClient, private firestore: AngularFirestore) {}

  getType(page: number, type: string): Observable<PageMoviesSeriesActors> {
    let subUrl: string = '/trending/all/week';
    if (type === 'Todos') {
      subUrl = '/trending/all/week';
    } else if (type === 'Películas') {
      subUrl = '/movie/popular';
    } else if (type === 'Series') {
      subUrl = '/tv/popular';
    } else {
      console.log(
        'error en la petición en service, type solo puede ser: Todos, Películas o Series'
      );
    }

    let params = new HttpParams()
      .set('language', 'es')
      .set('page', page.toString());

    return this._http.get<PageMoviesSeriesActors>(this.baseUrl + subUrl, {
      headers: this.headers,
      params: params,
    });
  }
  getSearchType(
    page: number,
    toSearch: string,
    type: string
  ): Observable<PageMoviesSeriesActors> {
    let subUrl: string = '/search/multi';
    if (type === 'Todos') {
      subUrl = '/search/multi';
    } else if (type === 'Películas') {
      subUrl = '/search/movie';
    } else if (type === 'Series') {
      subUrl = '/search/tv';
    } else {
      console.log(
        'error en la petición de busqueda en service, type solo puede ser Todos, Películas o Series'
      );
    }
    let params = new HttpParams()
      .set('language', 'es')
      .set('query', toSearch)
      .set('page', page.toString())
      .set('include_adult', false);

    return this._http.get<PageMoviesSeriesActors>(this.baseUrl + subUrl, {
      headers: this.headers,
      params: params,
    });
  }
  setIdFilmToShowDetails(id: number, media_type: MediaType) {
    this.idFilmToShowDetails = id;
    this.mediaType = media_type;
  }
  getIdFilmToShowDetails(): number {
    return this.idFilmToShowDetails;
  }
  getMediaTypeFilmToShowDetails(): MediaType {
    return this.mediaType;
  }

  getMovieById(): Observable<Movie> {
    let params = new HttpParams().set('language', 'es');

    return this._http.get<Movie>(
      this.baseUrl + '/movie/' + this.idFilmToShowDetails,
      {
        headers: this.headers,
        params: params,
      }
    );
  }
  getSerieById(): Observable<Serie> {
    let params = new HttpParams().set('language', 'es');

    return this._http.get<Serie>(
      this.baseUrl + '/tv/' + this.idFilmToShowDetails,
      {
        headers: this.headers,
        params: params,
      }
    );
  }

  addFilmToFirestore(
    userId: MoviesSeriesActorsUser,
    item: MoviesSeriesActorsBase,
    mediaType: MediaType
  ): Promise<any> {
    return this.firestore
      .collection('usuarios')
      .doc(`${userId}`)
      .collection(`${mediaType}`)
      .add(item);
  }
  getFromFirestore(
    userId: MoviesSeriesActorsUser,
    mediaType: MediaType
  ): Observable<any> {
    return this.firestore
      .collection('usuarios')
      .doc(`${userId}`)
      .collection(`${mediaType}`)
      .snapshotChanges();
  }
  deleteFromFirestore(
    idUser: string,
    id: string,
    mediaType: MediaType
  ): Promise<any> {
    return this.firestore
      .collection(`usuarios/${idUser}/${mediaType}`)
      .doc(id)
      .delete()
      .finally(() => console.log('borrado el id: ', id, mediaType, idUser));
  }
}
