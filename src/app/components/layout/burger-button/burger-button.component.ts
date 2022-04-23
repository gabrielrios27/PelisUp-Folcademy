import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-burger-button',
  templateUrl: './burger-button.component.html',
  styleUrls: ['./burger-button.component.css'],
})
export class BurgerButtonComponent implements OnInit {
  btnFlag: boolean = false;
  user: Observable<any> = this.authService.afauth.user;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  ToogleBtnFlag() {
    this.btnFlag = !this.btnFlag;
  }
  logOut() {
    this.authService.logOut();
    this.removeLocalStorage();
  }

  removeLocalStorage() {
    localStorage.removeItem('Usuario');
  }
}
