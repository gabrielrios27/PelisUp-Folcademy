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

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  logOut() {
    console.log(this.user);
    this.authService.logOut();
    this.removeLocalStorage();
    console.log(this.user);
  }

  removeLocalStorage() {
    localStorage.removeItem('Usuario');
  }
}
