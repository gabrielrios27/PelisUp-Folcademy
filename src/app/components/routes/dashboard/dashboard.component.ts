import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MoviesService } from 'src/app/services/user/movies.service';
import { MediaType } from 'src/interfaces/NewUser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: any;
  userJSON: string | null = null;
  movies: any;
  series: any;
  moviesCount: number = 0;
  seriesCount: number = 0;
  constructor(
    private authService: AuthService,
    private moviesService: MoviesService
  ) {}
  async ngOnInit() {
    // this.user = this.authService.getUserLogged(); /*obtengo el usuario desde el servicio*/
    this.getLocalStorage(); /*obtengo el usuario desde el Local Storage*/
    this.countMovies();
  }
  getLocalStorage() {
    /*Si hay en el local storage un usuario logeado lo guarda en 'user'*/
    this.userJSON = localStorage.getItem('Usuario');
    if (this.userJSON) {
      this.user = JSON.parse(this.userJSON);
    }
  }
  countMovies() {
    this.moviesService
      .getFromFirestore(this.user.uid, MediaType.Movie)
      .subscribe((response) => {
        this.movies = response;
        console.log('peliculas de firestore: ', this.movies.length);
        this.moviesCount = this.movies.length;
      });
  }
  countSeries() {
    this.moviesService
      .getFromFirestore(this.user.uid, MediaType.Tv)
      .subscribe((response) => {
        this.series = response;
        console.log('series de firestore: ', this.movies.length);
        this.seriesCount = this.series.length;
      });
  }
}
