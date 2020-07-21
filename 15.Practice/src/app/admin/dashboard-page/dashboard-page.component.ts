import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

import { PostsServices } from "../../shared/posts.services";
import { Post } from "../../shared/interfaces";
import { AlertService } from "../shared/services/alert.service";


@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  pSub: Subscription;
  dSub: Subscription;
  searchPostInput: string = '';

  constructor(
    private postsServices: PostsServices,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.pSub = this.postsServices.getAll().subscribe(posts => {
      this.posts = posts;
    })
  }

  remove(id: string) {
    this.dSub = this.postsServices.delete(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.alertService.danger('Deleted')
    })
  }

  ngOnDestroy(): void {
    if (this.pSub) { this.pSub.unsubscribe() }
    if (this.dSub) { this.dSub.unsubscribe() }
  }
}
