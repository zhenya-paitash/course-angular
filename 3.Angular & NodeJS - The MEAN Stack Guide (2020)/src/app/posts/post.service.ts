import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

import { Post } from '../shared/interfaces';
import { environment } from '../../environments/environment';


@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getPosts() {
    this.http
      .get<{message: string, posts: any}>(`${environment.server}/api/posts`)
      .pipe(map((data) => {
        return {
          message:  data.message,
          posts:    data.posts.map(post => {
            return {
              id:       post._id,
              title:    post.title,
              content:  post.content
            };
          })
        };
      }))
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http
      .get<{_id: string, title: string, content: string}>(`${environment.server}/api/posts/${id}`);
  }

  addPost(post: Post) {
    this.http.post<{message: string, postId: string}>(`${environment.server}/api/posts`, post)
      .subscribe((resData) => {
        post.id = resData.postId;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = {id, title, content};
    this.http.put(`${environment.server}/api/posts/${post.id}`, post)
      .subscribe(resolve => {
        const newPosts = [...this.posts];
        newPosts[newPosts.findIndex(i => i.id === post.id)] = post;
        this.posts = newPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  deletePost(id: string) {
    this.http.delete(`${environment.server}/api/posts/${id}`)
      .subscribe(() => {
        this.posts = this.posts.filter(i => i.id !== id);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
