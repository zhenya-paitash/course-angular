import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-counter',
  template: `Counter {{ counter }}`
})
export class CounterComponent {
  counter = 0;
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  @Output() counterEmitter: EventEmitter<number> = new EventEmitter<number>();

  inc() {
    this.counter++;
    this.counterEmitter.emit(this.counter);
  }

  dec() {
    this.counter--;
  }

}
