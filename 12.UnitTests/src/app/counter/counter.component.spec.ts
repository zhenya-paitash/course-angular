import { CounterComponent } from './counter.component';
import {FormBuilder} from '@angular/forms';


describe('CounterComponent', () => {
  let component: CounterComponent;
  beforeEach(() => {
    component = new CounterComponent(new FormBuilder());
  });

  xit('should X increment counter by 1', () => {
    // X.. - for skip this test/describe
  });

  it('should increment counter by 1', () => {
    component.inc();
    expect(component.counter).toBe(1);
  });

  it('should decriment counter by 1', () => {
    component.dec();
    expect(component.counter).toBe(-1);
  });

  it('should increment value by Event Emitter', () => {
    let result = null;
    component.counterEmitter.subscribe(v => result = v);

    component.inc();
    expect(result).toBe(1);
  });

  it('should create form with 2 controls', () => {
    // expect(component.form.contains('login')).toBe(true);
    expect(component.form.contains('login')).toBeTruthy();
    expect(component.form.contains('password')).toBeTruthy();
  });

  it('should mark login form invalid if empty values', () => {
    const login = component.form.get('login');
    login.setValue('');
    expect(login.valid).toBeFalsy();
  });
  it('should mark password form invalid if empty values', () => {
    const password = component.form.get('password');
    password.setValue('');
    expect(password.valid).toBeFalsy();
  });

});
