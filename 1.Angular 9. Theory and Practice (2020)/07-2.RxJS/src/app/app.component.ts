import { Component } from '@angular/core';
import {interval, Observable, Subject, Subscribable, Subscription} from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  sub: Subscription;

  stream$: Subject<void> = new Subject<void>();

  constructor() {
    this.sub = this.stream$.subscribe(i => console.log(`Sub: ${i}`));
  // //   const intervalStream$ = interval(1000);
  // //
  // //   this.sub = intervalStream$
  // //     .pipe(
  // //       filter(i => i % 2 === 0),
  // //       map(i => `Mapped ${i}`),
  // //       // switchMap(() => interval(500))
  // //     )
  // //     .subscribe((value) => console.log(value));
  //
  //   const stream$ = new Observable(observer => {
  //     setTimeout(() => {observer.next(1); }, 4000);
  //     setTimeout(() => {observer.complete(); }, 4000);
  //     setTimeout(() => {observer.error('error'); }, 5000);
  //     setTimeout(() => {observer.next(2); }, 6000);
  //   });
  //
  //   this.sub = stream$
  //     .pipe()
  //     .subscribe(
  //       next => console.log('Next: ' + next),
  //       error => console.log('Error: ' + error),
  //       () => console.log('Completed!')
  //     );
  }

  stopSub() {
    this.sub.unsubscribe();
  }

  nextValue(event) {
    // console.log(event);
    this.stream$.next(event.timeStamp);
  }
}
