import { Injectable } from '@angular/core';
import {LogService} from "./log.service";

@Injectable({providedIn: 'root'})
export class CounterService {

  constructor(
    private logService: LogService
  ) {
  }

  counter = 0;

  increase() {
    this.logService.log("++");
    this.counter++
  }

  decrease() {
    this.logService.log("--");
    this.counter--
  }
}
