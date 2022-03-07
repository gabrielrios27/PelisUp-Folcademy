import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Movie,
  MoviesSeriesActors,
  Serie,
  MediaType,
} from 'src/interfaces/NewUser';
@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  api_key: string = '0167913abe154169ea9d85e3e8a3e7da';
  baseUrl: string = 'https://api.themoviedb.org/3';

  idFilmToShowDetails: number = 0;
  mediaType: MediaType = MediaType.Movie;

  constructor(private _http: HttpClient) {}

  getTrending(): Observable<MoviesSeriesActors> {
    let params = new HttpParams()
      .set('api_key', this.api_key)
      .set('language', 'es');

    return this._http.get<MoviesSeriesActors>(
      this.baseUrl + '/trending/all/week',
      {
        params: params,
      }
    );
  }
  getMovies(): Observable<MoviesSeriesActors> {
    let params = new HttpParams()
      .set('api_key', this.api_key)
      .set('language', 'es');

    return this._http.get<MoviesSeriesActors>(this.baseUrl + '/movie/popular', {
      params: params,
    });
  }
  getSeries(): Observable<MoviesSeriesActors> {
    let params = new HttpParams()
      .set('api_key', this.api_key)
      .set('language', 'es');

    return this._http.get<MoviesSeriesActors>(this.baseUrl + '/tv/popular', {
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
}
