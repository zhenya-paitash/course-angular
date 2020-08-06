import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import { Post } from '../shared/interfaces';
import { environment } from '../../environments/environment';


@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  constructor(
    private http: HttpClient
  ) {}

  getPosts() {
    this.http
      .get<{message: string, posts: Post[]}>(`${environment.server}/api/posts`)
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(post: Post) {
    this.http.post<{message: string}>(`${environment.server}/api/posts`, post)
      .subscribe((resData) => {
        console.log(resData.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
