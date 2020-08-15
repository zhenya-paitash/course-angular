import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Subscription} from 'rxjs';

import { Post } from '../../shared/interfaces';
import { PostsService } from '../post.service';
import { mimeType } from './mime-type.validator';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit, OnDestroy {
  form: FormGroup;
  imagePreview: string;
  post: Post;
  isLoading = false;
  private mode = 'create';
  private postID: string;
  private authStatusSub: Subscription;
  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuth => {
        this.isLoading = false;
      });
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      content: new FormControl(null, Validators.required)
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postID')) {
        this.mode = 'edit';
        this.postID = paramMap.get('postID');
        this.isLoading = true;
        this.postsService.getPost(this.postID)
          .subscribe(postData => {
            this.isLoading = false;
            this.post = {
              id:        postData._id,
              title:     postData.title,
              content:   postData.content,
              imagePath: postData.imagePath,
              creator:   postData.creator
            };
            this.form.setValue({
              title:    this.post.title,
              content:  this.post.content,
              image:    this.post.imagePath
            });
          });
      } else {
        this.mode = 'create';
        this.postID = null;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.authStatusSub) this.authStatusSub.unsubscribe();
  }

  submit() {
    if (this.form.invalid) return;

    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    } else {
      this.postsService.updatePost(
        this.postID,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    }
    this.form.reset();
  }

  onImgPick($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();

    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.imagePreview = fileReader.result as string;
    };
    fileReader.readAsDataURL(file);
  }
}
