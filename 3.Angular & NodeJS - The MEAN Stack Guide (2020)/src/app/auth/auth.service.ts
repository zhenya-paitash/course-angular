import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

import { environment } from '../../environments/environment';
import { AuthData } from '../shared/interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
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

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = {email, password};
    this.http
      .post(`${environment.server}/api/user/signup`, authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = {email, password};
    this.http
      .post<{token: string, expiresIn: number}>(`${environment.server}/api/user/login`, authData)
      .subscribe(result => {
        const token = result.token;
        this.token = token;
        if (token) {
          const expiresInDuration = result.expiresIn;
          this.setAuthTimer(expiresInDuration);

          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const expDate = new Date(new Date().getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expDate);
          this.router.navigate(['/']);
        }
      });
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) return;

    const now = new Date();
    const expIn = authInfo.expirationDate.getTime() - now.getTime();
    if (expIn > 0) {
      this.token = authInfo.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.isAuthenticated = false;
    this.token = null;
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

  private saveAuthData(token: string, expiresIn: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expiresIn.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expDate = localStorage.getItem('expiration');
    if (!token || !expDate) return;

    return {
      token,
      expirationDate: new Date(expDate)
    }
  }

}
