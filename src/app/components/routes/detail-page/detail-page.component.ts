import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MoviesSeries } from 'src/interfaces/NewUser';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css'],
})
export class DetailPageComponent implements OnInit {
  nameFilm: string = '';

  constructor(private activeRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.nameFilm = this.activeRoute.snapshot.paramMap.get('name') || '';
  }
}
