import { Component } from '@angular/core';
import {CounterService} from "../services/counter.service";
import {CounterSecondService} from "../services/counter-second.service";

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  providers: [CounterSecondService]
})
export class CounterComponent {

  constructor(
    private counter: CounterService,
    private counterSecond: CounterSecondService
  ) { }

}
