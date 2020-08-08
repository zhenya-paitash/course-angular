import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';

import { Post } from '../../shared/interfaces';
import { PostsService } from '../post.service';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  form: FormGroup;
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
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, Validators.required)
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postID')) {
        this.mode = 'edit';
        this.postID = paramMap.get('postID');
        this.isLoading = true;
        this.postsService.getPost(this.postID)
          .subscribe(post => {
            this.isLoading = false;
            this.post = {
              id:       post._id,
              title:    post.title,
              content:  post.content
            };
            this.form.setValue({
              title:    this.post.title,
              content:  this.post.content,
            })
          });
      } else {
        this.mode = 'create';
        this.postID = null;
      }
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.isLoading = true;
    if (this.mode === 'create') {
      const newPost: Post = this.form.value;
      this.postsService.addPost(newPost);
    } else {
      this.postsService.updatePost(
        this.postID, this.form.value.title, this.form.value.content
      );
    }
    this.form.reset();
  }
}
