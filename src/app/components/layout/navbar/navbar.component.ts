import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';
import { DarkModeService } from 'src/app/services/user/dark-mode.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: Observable<any> = this.authService.afauth.user;
  darkMode: boolean = true;
  isDarkMode: string | null;

  constructor(
    private authService: AuthService,
    private _darkModeSvc: DarkModeService
  ) {
    this.isDarkMode = localStorage.getItem('theme');
    if (this.isDarkMode) {
      this.darkMode = JSON.parse(this.isDarkMode);
      this._darkModeSvc.changeDarkMode(this.darkMode);
    }
  }

  ngOnInit() {}

  logOut() {
    this.authService.logOut();
    this.removeLocalStorage();
  }

  removeLocalStorage() {
    localStorage.removeItem('Usuario');
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this._darkModeSvc.changeDarkMode(this.darkMode);
  }
}
