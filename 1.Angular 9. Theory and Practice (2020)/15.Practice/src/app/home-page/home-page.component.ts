import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";

import { PostsServices } from "../shared/posts.services";
import { Post } from "../shared/interfaces";


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  post$: Observable<Post[]>;

  constructor(
    private postsServices: PostsServices
  ) { }

  ngOnInit(): void {
    this.post$ = this.postsServices.getAll()
  }

}
