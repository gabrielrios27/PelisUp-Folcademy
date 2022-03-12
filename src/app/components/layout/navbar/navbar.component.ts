import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: any = this.authService.getUserLogged();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}
  logOut() {
    this.authService.logOut();
    this.user = null;
  }
}
