import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: any;
  userJSON: string | null = null;

  constructor(private authService: AuthService) {}
  async ngOnInit() {
    // this.user = this.authService.getUserLogged(); /*obtengo el usuario desde el servicio*/
    this.getLocalStorage(); /*obtengo el usuario desde el Local Storage*/
  }
  getLocalStorage() {
    /*Si hay en el local storage un usuario logeado lo guarda en 'user'*/
    this.userJSON = localStorage.getItem('Usuario');
    if (this.userJSON) {
      this.user = JSON.parse(this.userJSON);
    }
  }
}
