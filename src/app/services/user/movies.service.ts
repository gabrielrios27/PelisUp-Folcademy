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

  getTrending(): Observable<PageMoviesSeriesActors> {
    let params = new HttpParams()
      .set('api_key', this.api_key)
      .set('language', 'es');

    return this._http.get<PageMoviesSeriesActors>(
      this.baseUrl + '/trending/all/week',
      {
        params: params,
      }
    );
  }
  getMovies(): Observable<PageMoviesSeriesActors> {
    let params = new HttpParams()
      .set('api_key', this.api_key)
      .set('language', 'es');

    return this._http.get<PageMoviesSeriesActors>(
      this.baseUrl + '/movie/popular',
      {
        params: params,
      }
    );
  }
  getSeries(): Observable<PageMoviesSeriesActors> {
    let params = new HttpParams()
      .set('api_key', this.api_key)
      .set('language', 'es');

    return this._http.get<PageMoviesSeriesActors>(
      this.baseUrl + '/tv/popular',
      {
        params: params,
      }
    );
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
      .add(item)
      .then((res) => {
        return res;
      });
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
      .delete();
  }
}
