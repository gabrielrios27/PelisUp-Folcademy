import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { first, lastValueFrom, Observable, of as observableOf } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  errCode: string = '';
  user: any;

  /*afauth se deja publico porque lo uso en el navbar */
  constructor(
    public afauth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

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
  addUserToFirestore(userId: any): Promise<any> {
    return this.firestore.collection('usuarios').add(userId);
  }
}
