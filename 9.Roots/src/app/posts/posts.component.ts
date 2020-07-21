import {Component, OnInit} from '@angular/core';
import {PostsService} from '../posts.service';
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  showId: boolean = false;

  constructor(
    public postsService: PostsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((param: Params) => {
      this.showId = !!param.showId;
    });
  }

  showIdProgram() {
    this.router.navigate(['/posts'], {
      queryParams: {
        showId: true
      },
      fragment: 'programm-fragment'
    });
  }
}
