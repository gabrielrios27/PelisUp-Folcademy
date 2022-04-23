import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MoviesService } from 'src/app/services/user/movies.service';
import { MediaType, MoviesSeriesActorsBase } from 'src/interfaces/NewUser';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() img: string = 'BlackWidow.jpg';
  @Input() name: string = 'Black Widow';
  @Input() rating: number = 6.8;
  @Input() id: number = 0;
  @Input() mediaType: MediaType = MediaType.Tv;
  @Input() added: boolean = false;
  @Input() idGlobal: string = '';

  dataFilm: MoviesSeriesActorsBase = {} as MoviesSeriesActorsBase;
  user: Observable<any> = this.authService.afauth.user;
  userLocStg: any;
  userJSON: string | null = null;
  isAdded: boolean = false;
  idFilmAdded: string = '';

  constructor(
    private _moviesService: MoviesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getLocalStorage();
    if (this.mediaType === 'movie') {
      this.dataFilm = {
        poster_path: this.img,
        title: this.name,
        id: this.id,
        vote_average: this.rating,
      };
    } else {
      this.dataFilm = {
        poster_path: this.img,
        id: this.id,
        vote_average: this.rating,
        name: this.name,
      };
    }
  }
  addToFirestoreFromCard() {
    this._moviesService
      .addFilmToFirestore(this.userLocStg.uid, this.dataFilm, this.mediaType)
      .then((res) => (this.idFilmAdded = res.id))
      .finally(() => {
        console.log('respuesta del item añadido: ', this.idFilmAdded);
      });

    this.added = true;
  }
  deleteFromCard() {
    this._moviesService.deleteFromFirestore(
      this.userLocStg.uid,
      this.idFilmAdded || this.idGlobal,
      this.mediaType
    );
    this.added = false;
  }
  getLocalStorage() {
    /*Si hay en el local storage un usuario logeado lo guarda en 'user'*/
    this.userJSON = localStorage.getItem('Usuario');
    if (this.userJSON) {
      this.userLocStg = JSON.parse(this.userJSON);
    }
  }
}
