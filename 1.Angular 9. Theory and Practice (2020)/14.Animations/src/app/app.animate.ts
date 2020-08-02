import {animate, group, keyframes, query, state, style, transition, trigger, useAnimation} from '@angular/animations';
import {bounce, bounceOutUp} from 'ng-animate';

export const boxBounce = trigger('bounce', [
  transition('void => *', useAnimation(bounce)),
  transition('* => void', useAnimation(bounceOutUp, {
    params: {
      timing: 3,
      delay: 0.5
    }
  }))
]);

export const oldBoxAnimation = trigger('box', [
  state('start', style({background: 'blue'})),
  state('end', style({background: 'red', transform: 'scale(1.2)'})),
  state('special', style({background: 'yellow', transform: 'scale(0.5)', borderRadius: '50%'})),
  transition('start => end', animate(450)),
  transition('end => start', animate('800ms ease-in-out')),
  transition('special <=> *', [
    group([
      query('h4', [
        style({transform: 'scale(0.5)'}),
        animate(1000)
      ]),
      style({background: 'pink'}),
      animate(1000, style({background: 'green'})),
      animate(750)
    ])
  ]),
  // void => *
  transition(':enter', [
    animate('4s', keyframes([
      style({background: 'orange', offset: 0}),
      style({background: 'red', offset: 0.2}),
      style({background: 'green', offset: 0.3}),
      style({background: 'yellow', offset: 1})
    ])),
    style({opacity: 0}),
    animate('850ms ease-out')
  ]),
  // * => void
  transition(':leave', [
    style({opacity: 1}),
    animate(750, style({opacity: 0, transform: 'scale(1.2)', height: '0px'}))
  ])
]);

