import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-burger-button',
  templateUrl: './burger-button.component.html',
  styleUrls: ['./burger-button.component.css'],
})
export class BurgerButtonComponent implements OnInit {
  btnFlag: boolean = false;
  constructor() {}

  ngOnInit(): void {}
  ToogleBtnFlag() {
    this.btnFlag = !this.btnFlag;
    console.log('toggle: ' + this.btnFlag);
  }
}
