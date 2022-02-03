import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css'],
})
export class SearcherComponent implements OnInit {
  @Input() categorie: string = '';

  constructor() {}

  ngOnInit(): void {}
}
