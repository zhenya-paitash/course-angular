import {
  Directive,
  ElementRef,
  Host,
  HostBinding,
  HostListener,
  Input,
  Renderer2
} from "@angular/core";

@Directive({ selector: "[appStyle]" })
export class StyleDirective {

  @Input('appStyle') color: string = 'blue';
  @Input("dStyles") dStyles: {
    fontWeight?: string,
    border?: string,
    borderRadius?: string
  };

  @HostBinding("style.color") elColor = null;

  constructor(private el: ElementRef, private render: Renderer2) {
    // this.render.setStyle(this.el.nativeElement, "color", "blue");
    // el.nativeElement.style.color = "#ccc";
  }

  @HostListener("click", ["$event.target"]) onClick(event: Event) {
    console.log(event)
  }

  @HostListener("mouseenter") onMouseHover() {
    this.elColor = this.color;
    // this.render.setStyle(this.el.nativeElement, "color", this.color);
    // this.render.setStyle(this.el.nativeElement, "fontWeight", this.dStyles.fontWeight);
    // this.render.setStyle(this.el.nativeElement, "border", this.dStyles.border);
    // this.render.setStyle(this.el.nativeElement, "borderRadius", this.dStyles.borderRadius);
  }

  @HostListener("mouseleave") onLeave() {
    this.elColor = null;
    // this.render.setStyle(this.el.nativeElement, "color", null);
    // this.render.setStyle(this.el.nativeElement, "fontWeight", null);
    // this.render.setStyle(this.el.nativeElement, "border", null);
    // this.render.setStyle(this.el.nativeElement, "borderRadius", null);
  }
}
