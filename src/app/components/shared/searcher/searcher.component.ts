import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css'],
})
export class SearcherComponent implements OnInit {
  @Input() categorie: string = '';
  toSearch: string = '';

  @Output() buscar = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}
  Search(toSearch: string) {
    console.log(toSearch);
    this.buscar.emit(toSearch);
  }
}
