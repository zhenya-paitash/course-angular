import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {Observable} from "rxjs";

import { Post } from "../shared/interfaces";
import { PostsServices } from "../shared/posts.services";


@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$: Observable<Post>;

  @Input() post: Post;

  constructor(
    private route: ActivatedRoute,
    private postsServices: PostsServices
  ) { }

  ngOnInit(): void {
    this.post$ = this.route.params
      .pipe(switchMap((params: Params) => this.postsServices.getById(params['id']) ) );
  }

}
