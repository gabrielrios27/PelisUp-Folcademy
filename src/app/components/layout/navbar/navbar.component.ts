import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: Observable<any> = this.authService.afauth.user;

  flagBtnDark: boolean = false;
  flagBtnDarkJSON: string | null = null;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.getLocalStorage();
  }

  logOut() {
    console.log(this.user);
    this.authService.logOut();
    this.removeLocalStorage();
    console.log(this.user);
  }

  removeLocalStorage() {
    localStorage.removeItem('Usuario');
  }
  toggleBtnDark() {
    this.flagBtnDark = !this.flagBtnDark;
    this.setLocalStorage(this.flagBtnDark);
    this.authService.getLocalStorageBtnDark();

    console.log(this.flagBtnDark);
    console.log(this.authService.flagBtnDark);
  }
  setLocalStorage(data: boolean) {
    localStorage.setItem('darkMode', JSON.stringify(data));
  }
  getLocalStorage() {
    /*Si hay en el local storage un usuario logeado lo guarda en 'user'*/
    this.flagBtnDarkJSON = localStorage.getItem('darkMode');
    if (this.flagBtnDarkJSON) {
      this.flagBtnDark = JSON.parse(this.flagBtnDarkJSON);
    }
  }
}
