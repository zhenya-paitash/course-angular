import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

import { environment } from '../../environments/environment.prod';
import { AuthData } from '../shared/interfaces';

const BACKEND_URL = environment.apiUrl + '/user/';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private userId: string;
  private tokenTimer: any;
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = {email, password};
    this.http
      .post(BACKEND_URL + 'signup', authData)
      .subscribe(response => {
        this.router.navigate(['/login']);
      }, err => {
        this.authStatusListener.next(false);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = {email, password};
    this.http
      .post<{token: string, expiresIn: number, userId: string}>(BACKEND_URL + 'login', authData)
      // .pipe()
      .subscribe(result => {
        const token = result.token;
        this.token = token;
        if (token) {
          const expiresInDuration = result.expiresIn;
          this.setAuthTimer(expiresInDuration);

          this.userId = result.userId;
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const expDate = new Date(new Date().getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expDate, this.userId);
          this.router.navigate(['/']);
        }
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) return;

    const now = new Date();
    const expIn = authInfo.expirationDate.getTime() - now.getTime();
    if (expIn > 0) {
      this.token = authInfo.token;
      this.userId = authInfo.userId;
      this.isAuthenticated = true;
      this.setAuthTimer(expIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.isAuthenticated = false;
    this.token = null;
    this.userId = null;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expiresIn: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expiresIn.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expDate) return;

    return {
      token,
      expirationDate: new Date(expDate),
      userId
    };
  }

}
