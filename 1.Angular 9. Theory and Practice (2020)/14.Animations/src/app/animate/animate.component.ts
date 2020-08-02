import { Component, OnInit } from '@angular/core';
import {boxBounce} from '../app.animate';
// import {transition, trigger, useAnimation} from '@angular/animations';
// import {bounce, bounceOutUp} from 'ng-animate';

@Component({
  selector: 'app-animate',
  template: `
  <button (click)="visible = !visible">Toggle</button>
  <hr>
  <div *ngIf="visible" [@bounce] class="rect"></div>
  `,
  styleUrls: ['./animate.component.scss'],
  animations: [ boxBounce ]
})
export class AnimateComponent implements OnInit {
  visible = true;

  constructor() { }

  ngOnInit(): void {
  }

}
