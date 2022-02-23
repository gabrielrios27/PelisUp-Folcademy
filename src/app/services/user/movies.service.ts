import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    let headers = new HttpHeaders();
    return this._http.get<MoviesSeriesActors>(
      this.baseUrl +
        '/trending/all/week?api_key=0167913abe154169ea9d85e3e8a3e7da&language=en',
      {
        headers: headers,
      }
    );
  }
  getMovies(): Observable<MoviesSeriesActors> {
    let headers = new HttpHeaders();

    return this._http.get<MoviesSeriesActors>(
      this.baseUrl +
        '/movie/popular?api_key=0167913abe154169ea9d85e3e8a3e7da&language=en',
      {
        headers: headers,
      }
    );
  }
  getSeries(): Observable<MoviesSeriesActors> {
    let headers = new HttpHeaders();

    return this._http.get<MoviesSeriesActors>(
      this.baseUrl +
        '/tv/popular?api_key=0167913abe154169ea9d85e3e8a3e7da&language=en',
      {
        headers: headers,
      }
    );
  }
}
