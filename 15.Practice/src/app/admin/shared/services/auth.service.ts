import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, Subject, throwError} from "rxjs";

import {firebaseAuth, User} from "../../../shared/interfaces";
import {environment} from "../../../../environments/environment";
import {catchError, tap} from "rxjs/operators";


@Injectable({providedIn: "root"})
export class AuthService {

  public error$: Subject<string> = new Subject<string>();

  constructor(
    private http: HttpClient
  ) {
  }

  // получаем токен с сервера
  // не const, т.к. нам нужна проверка, не истёк ли токен
  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }

    return localStorage.getItem('fb-token');
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`;
    return this.http.post(url, user)
      .pipe(
        tap(this.setToken),
        catchError(this.catchErr.bind(this))
      );
  }

  logout() {
    this.setToken(null)
  }

  // отлов ошибок
  private catchErr(error: HttpErrorResponse) {
    console.log(error);
    const {message} = error.error.error;
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('User not found');
        break;
      case 'INVALID_EMAIL':
        this.error$.next('Invalid email');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Invalid password');
        break;
    }

    return throwError(error);
  }

  // авторизован ли пользователь
  isAuthenticated(): boolean {
    return !!this.token;
  }

  // изменение токена если не валиден
  // не set, т.к. будем передавать некоторые параметры
  private setToken(response: firebaseAuth | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn*1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }

  }
}
