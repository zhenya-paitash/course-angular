import {Component} from '@angular/core';
import {animate, group, keyframes, query, state, style, transition, trigger} from '@angular/animations';
import {oldBoxAnimation} from "./app.animate";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ oldBoxAnimation ]
})
export class AppComponent {
  myBoxState = 'start';
  boxVisible = true;

  animateBox() {
    this.myBoxState = this.myBoxState === 'start' ? 'end' : 'start';
  }

  logAnimation(event: AnimationEvent) {
    console.log('animation event', event);
  }

  logDoneAnimation(event: AnimationEvent) {
    console.log('done animation', event);
  }
}
