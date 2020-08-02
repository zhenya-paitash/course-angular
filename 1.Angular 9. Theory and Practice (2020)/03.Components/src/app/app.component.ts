import {Component, OnInit} from '@angular/core';

export interface Post {
  title: string,
  text: string,
  id?: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  posts: Post[] = [
    {title: "Хочу выучить Angular", text: "Я всё еще учу компоненты", id: 1},
    {title: "Следующий блок", text: "Будет про директивы и еще про пойп", id: 2}
  ];

  updatePosts(post: Post) {
    // console.log(post);
    this.posts.unshift(post);
  }

  removePost(post: Post) {
    // console.log(post);
    this.posts = this.posts.filter(i => i.title !== post.title)
  }

  // "странная вещь"
  ngOnInit(): void {
    // setTimeout(() => {
    //   console.log("timeout...");
    //   this.posts[0].title = 'Измененно...'
    // }, 5000);
    setTimeout(() => {
      console.log("timeout...");
      this.posts[0] = {
        title: "Изменённый титл...",
        text: "Изменённый текст...",
        id: 1
      };
    }, 5000);
  }
}
