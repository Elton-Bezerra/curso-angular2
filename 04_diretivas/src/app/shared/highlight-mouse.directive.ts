import { Directive, HostListener, ElementRef, Renderer, HostBinding } from '@angular/core';

@Directive({
  selector: '[highlightMouse]'
})
export class HighlightMouseDirective {

  @HostListener('mouseenter') onMouseover() {
    // this._renderer.setElementStyle(this._elementRef.nativeElement,'background-color' ,'yellowgreen');
    this.backgroundColor = 'yellow';
  }

  @HostListener('mouseleave') onMouseLeave() {
    // this._renderer.setElementStyle(this._elementRef.nativeElement,'background-color' ,'white');
    this.backgroundColor = 'white';
  }

  // @HostBinding('style.backgroundColor') backgroundColor: string;

  @HostBinding('style.backgroundColor') get setColor() {//stylebinding no elemento que contem a diretiva
    return this.backgroundColor;
  }
  private backgroundColor: string;

  constructor(//private _elementRef: ElementRef, private _renderer: Renderer
  ) { }

}
