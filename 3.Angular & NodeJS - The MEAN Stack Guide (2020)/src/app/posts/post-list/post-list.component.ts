import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {PageEvent} from '@angular/material/paginator';

import { Post } from '../../shared/interfaces';
import { PostsService } from '../post.service';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub: Subscription;
  private authSub: Subscription;
  isLoading = false;
  isAuthenticated = false;
  userId: string;
  curPage = 1;
  postsPerPage = 2;
  totalPosts = 0;
  pageSizeOption = [1, 2, 5, 10];
  constructor(
    public postsService: PostsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.curPage);
    this.userId = this.authService.getUserId();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((postData: {posts: Post[], postCount: number} ) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      }, err => {
        this.isLoading = false;
      });
    this.isAuthenticated = this.authService.getIsAuth();
    this.authSub = this.authService.getAuthStatusListener()
      .subscribe(isAuth => {
        this.isAuthenticated = isAuth;
        this.userId = this.authService.getUserId();
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.curPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.curPage);
  }

  ngOnDestroy() {
    if (this.postsSub) this.postsSub.unsubscribe();
    if (this.authSub) this.authSub.unsubscribe();
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.curPage);
    }, err => {
      this.isLoading = false;
    });
  }


}
