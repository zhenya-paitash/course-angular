import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthService {
  private isLogin: boolean = false;

  login() {
    this.isLogin = true;
  }

  logout() {
    this.isLogin = false;
  }

  isAuthenticate(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      setTimeout(() => {
        resolve(this.isLogin);
      }, 1000);
    });
  }
}
