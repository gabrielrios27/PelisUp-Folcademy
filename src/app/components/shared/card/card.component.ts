import { Component, Input, OnInit } from '@angular/core';
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
  @Input() isLoged: string = 'notLoged';

  dataFilm: MoviesSeriesActorsBase;

  constructor(private _moviesService: MoviesService) {
    if (this.mediaType === 'tv') {
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

  ngOnInit(): void {
    console.log(this.isLoged);
  }
  addToFirestoreFromCard() {
    this._moviesService.addToFirestore(this.dataFilm, this.mediaType);
  }
}
