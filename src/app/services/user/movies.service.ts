import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { first, lastValueFrom, Observable } from 'rxjs';
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

  idFilmToShowDetails: number = 0;
  mediaType: MediaType = MediaType.Movie;
  data: MoviesSeriesActorsUser = {} as MoviesSeriesActorsUser;

  constructor(private _http: HttpClient, private firestore: AngularFirestore) {}

  getTrending(page: number): Observable<PageMoviesSeriesActors> {
    let params = new HttpParams()
      .set('api_key', this.api_key)
      .set('language', 'es')
      .set('page', page.toString());

    return this._http.get<PageMoviesSeriesActors>(
      this.baseUrl + '/trending/all/week',
      {
        params: params,
      }
    );
  }
  getMovies(page: number): Observable<PageMoviesSeriesActors> {
    let params = new HttpParams()
      .set('api_key', this.api_key)
      .set('language', 'es')
      .set('page', page.toString());
    return this._http.get<PageMoviesSeriesActors>(
      this.baseUrl + '/movie/popular',
      {
        params: params,
      }
    );
  }
  getSeries(page: number): Observable<PageMoviesSeriesActors> {
    let params = new HttpParams()
      .set('api_key', this.api_key)
      .set('language', 'es')
      .set('page', page.toString());
    return this._http.get<PageMoviesSeriesActors>(
      this.baseUrl + '/tv/popular',
      {
        params: params,
      }
    );
  }
  getSearchTrending(
    page: number,
    toSearch: string
  ): Observable<PageMoviesSeriesActors> {
    let params = new HttpParams()
      .set('api_key', this.api_key)
      .set('language', 'es')
      .set('query', toSearch)
      .set('page', page.toString());

    return this._http.get<PageMoviesSeriesActors>(
      this.baseUrl + '/search/multi',
      {
        params: params,
      }
    );
  }
  getSearchMovie(
    page: number,
    toSearch: string
  ): Observable<PageMoviesSeriesActors> {
    let params = new HttpParams()
      .set('api_key', this.api_key)
      .set('language', 'es')
      .set('query', toSearch)
      .set('page', page.toString())
      .set('include_adult', false);

    return this._http.get<PageMoviesSeriesActors>(
      this.baseUrl + '/search/movie',
      {
        params: params,
      }
    );
  }
  getSearchSerie(
    page: number,
    toSearch: string
  ): Observable<PageMoviesSeriesActors> {
    let params = new HttpParams()
      .set('api_key', this.api_key)
      .set('language', 'es')
      .set('page', page.toString())
      .set('query', toSearch)
      .set('include_adult', false);

    return this._http.get<PageMoviesSeriesActors>(this.baseUrl + '/search/tv', {
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
    let params = new HttpParams()
      .set('api_key', this.api_key)
      .set('language', 'es');

    return this._http.get<Movie>(
      this.baseUrl + '/movie/' + this.idFilmToShowDetails,
      {
        params: params,
      }
    );
  }
  getSerieById(): Observable<Serie> {
    let params = new HttpParams()
      .set('api_key', this.api_key)
      .set('language', 'es');

    return this._http.get<Serie>(
      this.baseUrl + '/tv/' + this.idFilmToShowDetails,
      {
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
