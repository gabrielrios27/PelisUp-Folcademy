import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/user/movies.service';
import { MediaType } from 'src/interfaces/NewUser';

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

  constructor(private _moviesService: MoviesService) {}

  ngOnInit(): void {}
}
