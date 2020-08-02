import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";

import { User } from "../../shared/interfaces";
import { AuthService } from "../shared/services/auth.service";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;
  btnSubmit = false;
  needLogin;

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['needLogin']) { this.needLogin = 'You need be login' }
      else if (params['authError']) { this.needLogin = 'Session is over. Pls login again' }
    });

    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.btnSubmit = true;
    const user: User = this.form.value;
    // const user: User = {
    //   email: this.form.value.email,
    //   password: this.form.value.password,
    // };

    // console.log('User: ', user);
    this.auth.login(user).subscribe((res) => {
      this.form.reset();
      this.router.navigate(['/admin', 'dashboard']);
      this.btnSubmit = false;
    }, error => {
      this.form.get('password').setValue(null);
      this.btnSubmit = false;
    });
  }
}
