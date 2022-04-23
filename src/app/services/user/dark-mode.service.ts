import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  isDarkMode: string | null;

  public darkModeSubject = new BehaviorSubject(true);

  constructor() {
    this.isDarkMode = localStorage.getItem('theme');
    if (this.isDarkMode) {
      this.darkModeSubject.next(JSON.parse(this.isDarkMode));
    }
  }
  ngOnInit() {}

  changeDarkMode(darkMode: boolean) {
    this.darkModeSubject.next(darkMode);
    localStorage.setItem('theme', darkMode.toString());
  }
}
