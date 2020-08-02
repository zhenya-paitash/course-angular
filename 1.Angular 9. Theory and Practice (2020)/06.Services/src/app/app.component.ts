import { Component } from '@angular/core';
import {CounterService} from "./services/counter.service";
import {CounterSecondService} from "./services/counter-second.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CounterSecondService]
})
export class AppComponent {
  constructor(
    private counter: CounterService,
    private counterSecond: CounterSecondService
  ) {}
}
