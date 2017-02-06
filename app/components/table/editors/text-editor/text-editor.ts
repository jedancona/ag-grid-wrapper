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

  @ViewChild('input', {read: ViewContainerRef}) public input: any;

  agInit(params: any): void {
    this.params = params;
    this.value = this.params.value;
  }

  getValue(): any {
    return this.value;
  }

  isCancelBeforeStart(): boolean {
    return this.cancelBeforeStart;
  }

  onBlur(event: any): void {
    this.params.api.stopEditing();
  }

  // dont use afterGuiAttached for post gui events - hook into ngAfterViewInit instead for this
  ngAfterViewInit() {
    this.input.element.nativeElement.focus();
  }

}
