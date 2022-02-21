import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() img: string = 'BlackWidow.jpg';
  @Input() name: string = 'Black Widow';
  @Input() rating: number = 6.8;

  constructor() {}

  ngOnInit(): void {}
}
