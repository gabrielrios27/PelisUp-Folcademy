import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MoviesSeriesActors } from 'src/interfaces/NewUser';
@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  api_key: string = '0167913abe154169ea9d85e3e8a3e7da';
  baseUrl: string = 'https://api.themoviedb.org/3';

  constructor(private _http: HttpClient) {}

  getTrending(): Observable<MoviesSeriesActors> {
    let params = new HttpParams().set('api_key', this.api_key);

    return this._http.get<MoviesSeriesActors>(
      this.baseUrl + '/trending/all/week',
      {
        params: params,
      }
    );
  }
  getMovies(): Observable<MoviesSeriesActors> {
    let params = new HttpParams().set('api_key', this.api_key);

    return this._http.get<MoviesSeriesActors>(this.baseUrl + '/movie/popular', {
      params: params,
    });
  }
  getSeries(): Observable<MoviesSeriesActors> {
    let params = new HttpParams().set('api_key', this.api_key);

    return this._http.get<MoviesSeriesActors>(this.baseUrl + '/tv/popular', {
      params: params,
    });
  }
}
