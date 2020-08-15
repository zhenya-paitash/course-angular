import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private loginSub: Subscription;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.loginSub = this.authService.getAuthStatusListener().subscribe(authStatus => {
      this.isLoading = false;
    });
  }
  ngOnDestroy(): void {
    if (this.loginSub) this.loginSub.unsubscribe();
  }
  onLogin(form: NgForm) {
    if (form.invalid) return;

    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
  }
}
