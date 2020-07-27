import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {Post} from "../app.component";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  // changeDetection: ChangeDetectionStrategy.Default,
  // говорим NG реагировать ТОЛЬКО на изменение Input'ов !!! *для ОПТИМИЗАЦИИ
  changeDetection: ChangeDetectionStrategy.OnPush,
  // для изменения инкапсуляции стилей (чтобы например h2 стиль был для всех h2 в проекте)
  encapsulation: ViewEncapsulation.None
})


export class PostComponent implements
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy
{
  // получаем
  @Input() post: Post;
  // отправяем
  @Output() onRemove: EventEmitter<Post> = new EventEmitter<Post>();
  @ContentChild("info", {static: true}) infoRef: ElementRef;

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngChanges", changes)
  }

  removePost() {
    this.onRemove.emit(this.post)
  }


  // LIVECICLE HOOK's
  // void - означает что мы ничего не возвращаем из метода
  ngOnInit(): void {
    console.log("ngInit")
    // console.log(this.infoRef.nativeElement)
  }

  ngDoCheck(): void {
    console.log("ngDoCheck")
  }

  ngAfterContentInit(): void {
    console.log("ngAfterContentInit")
  }

  ngAfterContentChecked(): void {
    console.log("ngAfterContentChecked")
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit")
  }

  ngAfterViewChecked(): void {
    console.log("ngAfterViewChecked")
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy")
  }

}
