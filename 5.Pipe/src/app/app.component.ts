import { Component } from '@angular/core';
import {Observable} from "rxjs";

export interface Post {
  title: string,
  text: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  e: number = Math.E;
  str: string = 'hello world';
  date: Date = new Date();
  float: number = 0.42;
  obj = { a:1, b:2, c:{d:3, e:4} };

  search = '';
  searchField = 'title';
  posts: Post[] = [
    {title: "1", text: "ad"},
    {title: "2", text: "adafsdfdssdaffsd"},
    {title: "3", text: "adasd"},
  ];

  nowDate: Observable<Date> = new Observable(obs => {
    setInterval(() => {
      obs.next(new Date())
    }, 1000)
  });

  promise: Promise<string> = new Promise<string>(
    res => {
      setTimeout(() => res("Promise Completed!"), 5000)
    }
  );

  addPost() {
    this.posts.unshift({title: "0", text: "Angular 9"})
  }
}
