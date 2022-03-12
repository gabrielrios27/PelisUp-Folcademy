import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { first, lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  errCode: string = '';
  user: any = null;
  constructor(private afauth: AngularFireAuth) {}
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
  getUserLogged() {
    this.user = lastValueFrom(this.afauth.authState.pipe(first()));
    return this.user;
    // this.afauth.authState.pipe(first()).toPromise();  --- toPromise deprecated por eso se usa la lastValueFrom
  }
  logOut() {
    this.afauth.signOut();
  }
}
