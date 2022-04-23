import { Component } from '@angular/core';
import { DarkModeService } from './services/user/dark-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public _darkModeSvc: DarkModeService) {}
}
