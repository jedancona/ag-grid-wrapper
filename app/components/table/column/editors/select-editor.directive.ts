import {Directive, ElementRef, AfterViewInit, OnDestroy} from "@angular/core";

@Directive({ selector: '[selectEditorOpenSelect]' })
export class SelectEditorDirective implements AfterViewInit, OnDestroy{

  readonly selectTimerWait: number = 200;

  private mdSelect: any;
  private selectTimer: any;
  constructor(el: ElementRef) {
    this.mdSelect = el.nativeElement;
  }

  ngAfterViewInit() {
    this.selectTimer = setTimeout(()=>{
      this.mdSelect.getElementsByClassName('md-select-trigger')[0].click();
    },this.selectTimerWait);
  }

  ngOnDestroy() {
    this.selectTimer && clearTimeout(this.selectTimer);
    this.selectTimer = null;
    this.mdSelect = null;
  }
}
