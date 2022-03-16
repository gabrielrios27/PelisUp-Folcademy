import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { first, lastValueFrom, Observable, of as observableOf } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  errCode: string = '';
  user: any;

  public flagBtnDark: Observable<boolean> = this.getLocalStorageBtnDark();
  flagBtnDarkJSON: string | null = null;
  /*afauth se deja publico porque lo uso en el navbar */
  constructor(public afauth: AngularFireAuth) {}

  async login(email: string, password: string) {
    this.errCode = '';
    this.logOut();
    try {
      return await this.afauth.signInWithEmailAndPassword(email, password);
    } catch (err: any) {
      console.log(err.code);
      this.errCode = err.code;
      return null;
    }
  }
  async register(email: string, password: string) {
    this.logOut();
    this.errCode = '';
    try {
      return await this.afauth.createUserWithEmailAndPassword(email, password);
    } catch (err: any) {
      console.log('error en el login: ', err);
      this.errCode = err.code;
      return null;
    }
  }
  async loginWithGoogle() {
    this.logOut();
    try {
      return await this.afauth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );
    } catch (err) {
      console.log('error en el login: ', err);
      return null;
    }
  }
  getUserLogged(): Observable<any> {
    this.user = lastValueFrom(this.afauth.authState.pipe(first()));
    console.log(this.user);
    return this.user;
  }
  logOut() {
    this.afauth.signOut();
    this.getUserLogged();
    this.user = null;
  }

  getLocalStorageBtnDark(): Observable<boolean> {
    let flagBtnDark$;
    this.flagBtnDarkJSON = localStorage.getItem('darkMode');
    if (this.flagBtnDarkJSON) {
      flagBtnDark$ = observableOf(JSON.parse(this.flagBtnDarkJSON));
    } else {
      flagBtnDark$ = observableOf(false);
    }
    return flagBtnDark$;
  }
}
