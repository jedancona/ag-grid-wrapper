/* tslint:disable */
import {Component, ViewContainerRef, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';

import {AgEditorComponent} from 'ag-grid-ng2/main';

@Component({
  selector: 'text-cell',
  template: `<div class="editor"><input #input type="text" (blur)="onBlur($event)" [(ngModel)]="value"></div>`
})
export class TextEditorComponent implements AgEditorComponent, AfterViewInit {
  private params: any;
  public value: number;
  private cancelBeforeStart: boolean = false;
  private timeoutCancel: any;

  @ViewChild('input', {read: ViewContainerRef}) public input: any;

  agInit(params: any): void {
    this.params = params;
    this.value = this.params.value;

    if(this.timeoutCancel) {
      clearTimeout(this.timeoutCancel);
    }

    // if the row is floating a.k.a footer row do not allow editing.
    if (this.params.node.floating) {
      this.cancelBeforeStart = true;
    }
  }

  getValue(): any {
    return this.value;
  }

  isCancelBeforeStart(): boolean {
    return this.cancelBeforeStart;
  }

  onBlur(event: any): void {
    /*this.timeoutCancel = setTimeout((): void => {
      this.params.api.stopEditing();
    },200);*/
  }

  // dont use afterGuiAttached for post gui events - hook into ngAfterViewInit instead for this
  ngAfterViewInit() {
    this.input.element.nativeElement.focus();
  }

}
