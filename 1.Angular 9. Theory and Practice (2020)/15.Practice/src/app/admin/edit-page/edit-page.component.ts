import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {switchMap} from "rxjs/operators";
import {Subscription} from "rxjs";

import { PostsServices } from "../../shared/posts.services";
import { Post } from "../../shared/interfaces";
import { AlertService } from "../shared/services/alert.service";


@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  post: Post;
  uSub: Subscription;
  editStatus: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private postsServices: PostsServices,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap((params: Params) => {
        return this.postsServices.getById(params['id'])
      }))
      .subscribe((post: Post) => {
        this.post = post;
        this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          text: new FormControl(post.text, Validators.required)
        })
      })
  }

  ngOnDestroy(): void {
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.editStatus = true;
    this.uSub = this.postsServices.update({
      ...this.post,
      title: this.form.value.title,
      text: this.form.value.text
    })
      .subscribe(() => {
        this.editStatus = false;
        this.alertService.warning('Updated')
      })
  }
}
