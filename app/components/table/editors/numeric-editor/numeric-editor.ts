import {Component, ViewContainerRef, ViewChild, AfterViewInit} from '@angular/core';

import {AgEditorComponent} from 'ag-grid-ng2/main';

@Component({
  selector: 'numeric-cell',
  template: `<input #input (keydown)="onKeyDown($event)" (blur)="onBlur($event)" [(ngModel)]="value">`
})
export class NumericEditorComponent implements AgEditorComponent, AfterViewInit {
  private params: any;
  public value: number;
  private cancelBeforeStart: boolean = false;

  @ViewChild('input', {read: ViewContainerRef}) public input: any;


  agInit(params: any): void {
    this.params = params;
    this.value = this.params.value;
    // console.debug('numeric editor');
    // only start edit if key pressed is a number, not a letter
    this.cancelBeforeStart = params.charPress && ('1234567890'.indexOf(params.charPress) < 0);
  }

  getValue(): any {
    return this.value;
  }

  isCancelBeforeStart(): boolean {
    return this.cancelBeforeStart;
  }

  onKeyDown(event: any): void {
    if (!this.isKeyPressedNumeric(event)) {
      if (event.preventDefault) event.preventDefault();
    }
  }

  onBlur(event: any): void {
    console.debug(this.params, event);
    this.params.api.stopEditing();
  }

  // dont use afterGuiAttached for post gui events - hook into ngAfterViewInit instead for this
  ngAfterViewInit() {
    this.input.element.nativeElement.focus();
  }

  private getCharCodeFromEvent(event: any): any {
    event = event || window.event;
    return (typeof event.which == "undefined") ? event.keyCode : event.which;
  }

  private isCharNumeric(charStr: any): boolean {
    return !!/\d/.test(charStr);
  }

  private isKeyPressedNumeric(event: any): boolean {
    var charCode = this.getCharCodeFromEvent(event);
    var charStr = String.fromCharCode(charCode);
    return this.isCharNumeric(charStr);
  }
}
