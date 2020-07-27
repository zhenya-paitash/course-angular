import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Post} from "../app.component";


@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})


export class PostFormComponent implements OnInit {
  // отпраляем
  @Output() onAdd: EventEmitter<Post> = new EventEmitter<Post>();
  // static: TRUE - если будем использовать в ngOnInit()
  // ** параметр static введем в 8ой версии NG, в 9 он якобы необязателен
  @ViewChild("titleInput", {static: false}) inputRef: ElementRef;

  title: string = "";
  text: string = "";

  constructor() {}
  ngOnInit(): void {}

  onAddPost () {
    if (this.text.trim() && this.title.trim()) {
      const post: Post =  {
        title: this.title,
        text: this.text
      };

      this.onAdd.emit(post);
      // console.log(post);
      this.title = this.text = "";
    }
  };

  focusTitle() {
    // console.log(this.inputRef);
    this.inputRef.nativeElement.focus();
  }
}
