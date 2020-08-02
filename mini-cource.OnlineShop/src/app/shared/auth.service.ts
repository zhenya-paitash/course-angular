import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

import { firebaseAuth, User } from "./interfaces";
import { environment } from "../../environments/environment";


@Injectable( {providedIn: 'root'} )
export class AuthService {
  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    return this.http
      .post(`${environment.authURL}${environment.apiKey}`, user)
      .pipe( tap(this.setToken) )
  }

  private setToken(res: firebaseAuth | null) {
    if (res) {
      const expDate = new Date(new Date().getTime() + +res.expiresIn*1000);
      localStorage.setItem('fb-token', res.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }
  }

  get token(): string {
    const expDate = localStorage.getItem('fb-token-exp');
    if (new Date() > new Date(expDate)) {
      this.logout();
      return null
    }

    return localStorage.getItem('fb-token')
  }

  logout() {
    this.setToken(null)
  }

  isAuthenticated() {
    return !!this.token
  }
}
