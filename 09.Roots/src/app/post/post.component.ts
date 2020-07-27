import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Post, PostsService} from '../posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post: Post;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    // private postsService: PostsService
  ) {}

  ngOnInit(): void {
    // this.post = this.route.snapshot.data.post;

    this.route.data.subscribe(data => {
      this.post = data.post;
    })

    // this.route.params.subscribe((param: Params) => {
    //   // console.log(param);
    //   // this.post = this.postsService.getById(parseInt(param.id));
    //   this.post = this.postsService.getById(+param.id);
    // });
  }

  loadPost() {
    this.router.navigate(['/posts', 44]);
  }
}
