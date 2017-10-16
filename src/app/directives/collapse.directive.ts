import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appCollapse]'
})
export class CollapseDirective {

  @Input() el: any;

  constructor() { }

  @HostListener('click')
  private onClick() {
    this.el.classList.remove('show');
  }

}
