import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MoviesService } from 'src/app/services/user/movies.service';
import { MediaType, Movie, Serie } from 'src/interfaces/NewUser';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css'],
})
export class DetailPageComponent implements OnInit {
  nameFilm: string = '';
  idFilm: number;
  mediaType: MediaType;
  movieToShow: Movie;
  serieToShow: Serie;

  backDropPath: string = '';
  tagline: boolean = false;
  user: Observable<any> = this.authService.afauth.user;

  constructor(
    private _moviesService: MoviesService,
    private rutaActiva: ActivatedRoute,
    private authService: AuthService
  ) {
    this.idFilm = 0;
    this.mediaType = MediaType.Movie;
    this.movieToShow = {} as Movie;
    this.serieToShow = {} as Serie;
  }

  ngOnInit(): void {
    let idToShow;
    this.rutaActiva.paramMap.subscribe((params: ParamMap) => {
      idToShow = params.get('id');
    });
    this.idFilm = Number(idToShow);
    let mediaToShow;
    this.rutaActiva.paramMap.subscribe((params: ParamMap) => {
      mediaToShow = params.get('mediaType');
    });

    if (mediaToShow == 'movie') {
      this.mediaType = MediaType.Movie;
    } else if (mediaToShow == 'tv') {
      this.mediaType = MediaType.Tv;
    }
    this._moviesService.setIdFilmToShowDetails(this.idFilm, this.mediaType);

    this.getFilmIdToShow(this.mediaType);
  }
  getFilmIdToShow(media_type: MediaType) {
    if (media_type == MediaType.Movie) {
      this._moviesService.getMovieById().subscribe({
        next: (data: Movie) => {
          this.movieToShow = data;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('Request id movies complete');
          if (this.movieToShow.tagline != '') {
            this.tagline = true;
          }
          this.backDropPath = this.movieToShow.backdrop_path;
        },
      });
    } else if (media_type == MediaType.Tv) {
      this._moviesService.getSerieById().subscribe({
        next: (data: Serie) => {
          this.serieToShow = data;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('Request id serie complete');
          if (this.serieToShow.tagline != '') {
            this.tagline = true;
          }

          this.backDropPath = this.serieToShow.backdrop_path;
        },
      });
    }
  }
}
