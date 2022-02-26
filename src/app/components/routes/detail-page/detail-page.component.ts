import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MoviesService } from 'src/app/services/user/movies.service';
import { MediaType, Movie, MoviesSeries, Serie } from 'src/interfaces/NewUser';
import { SeriesComponent } from '../series/series.component';

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
  constructor(
    private _moviesService: MoviesService,
    private rutaActiva: ActivatedRoute
  ) {
    this.idFilm = this._moviesService.getIdFilmToShowDetails();
    this.mediaType = this._moviesService.getMediaTypeFilmToShowDetails();
    this.movieToShow = {} as Movie;
    this.serieToShow = {} as Serie;
  }

  ngOnInit(): void {
    console.log(this.rutaActiva.snapshot.paramMap.get('id'));
    let infoFilm = this.rutaActiva.snapshot.paramMap.get('id');
    console.log(infoFilm);
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
          console.log(this.movieToShow);
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
          console.log(this.serieToShow);
        },
      });
    }
  }
}
