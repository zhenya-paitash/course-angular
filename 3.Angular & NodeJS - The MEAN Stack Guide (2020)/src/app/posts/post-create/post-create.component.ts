import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";

import { Post } from '../../shared/interfaces';
import { PostsService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent {
  enteredTitle = "";
  enteredContent = "";

  constructor(public postsService: PostsService) {}

  onAddPost(form: NgForm) {
    if (form.invalid) return;

    const newPost: Post = form.value;
    this.postsService.addPost(newPost)
    form.resetForm();
  }
}
