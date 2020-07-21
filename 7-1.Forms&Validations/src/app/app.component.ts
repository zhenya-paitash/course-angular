import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {MyValidators} from "./my.validators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  appState: 'off';

  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.email,
        Validators.required,
        MyValidators.restrictedEmail
      ], [
        MyValidators.uniqueEmail
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(12)
      ]),
      address: new FormGroup({
        country:  new FormControl('ru'),
        city:     new FormControl(null, Validators.required)
      }),
      skills: new FormArray([]),


    });
  }

  formSubmit() {
    if (this.form.valid) { console.log({...this.form.value}); }
    this.form.reset();
  }

  selectCapital() {
    const cityMap = {
      ru: 'Москва',
      ua: 'Киев',
      by: 'Минск'
    };

    const city = cityMap[this.form.get('address').get('country').value];

    this.form.patchValue({address: {city}});
  }

  addSkill() {
    const control = new FormControl(null, Validators.required);
    (this.form.get('skills') as FormArray).push(control);
  }

  appChange() {
    console.log(this.appState);
  }
}
