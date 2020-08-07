import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';

import { Post } from '../../shared/interfaces';
import { PostsService } from '../post.service';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  post: Post;
  isLoading: boolean = false;
  private mode = 'create';
  private postID: string;
  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postID')) {
        this.mode = 'edit';
        this.postID = paramMap.get('postID');
        this.isLoading = true;
        this.postsService.getPost(this.postID)
          .subscribe(post => {
            this.isLoading = false;
            this.post = {
              id: post._id,
              title: post.title,
              content: post.content
            };
          });
      } else {
        this.mode = 'create';
        this.postID = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) return;

    this.isLoading = true;
    if (this.mode === 'create') {
      const newPost: Post = form.value;
      this.postsService.addPost(newPost);
    } else {
      this.postsService.updatePost(
        this.postID, form.value.title, form.value.content
      );
    }
    form.resetForm();
  }
}
