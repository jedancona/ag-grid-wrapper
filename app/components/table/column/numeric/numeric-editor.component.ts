/* tslint:disable */
import { Component, ViewContainerRef, ViewChild, AfterViewInit } from '@angular/core';

import { AgEditorComponent } from 'ag-grid-ng2/main';

@Component({
  moduleId: module.id,
  selector: 'table-column-numeric-editor',
  templateUrl: './numeric-editor.component.tpl.html'
})
export class TableColumnNumericEditorComponent implements AgEditorComponent, AfterViewInit {
  private params: any;
  public value: number;
  private cancelBeforeStart: boolean = false;

  @ViewChild('input', { read: ViewContainerRef }) public input: any;

  agInit(params: any): void {
    this.params = params;
    this.value = this.params.value;
    // console.debug('numeric editor');
    // only start edit if key pressed is a number, not a letter
    this.cancelBeforeStart = params.charPress && ('1234567890'.indexOf(params.charPress) < 0);

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

  onKeyDown(event: any): void {
    if (!this.isKeyPressedNumeric(event)) {
      if (event.preventDefault) event.preventDefault();
    }
  }

  onBlur(event: any): void {
    //this.params.api.stopEditing();
  }

  // dont use afterGuiAttached for post gui events - hook into ngAfterViewInit instead for this
  ngAfterViewInit() {
    this.input.element.nativeElement.focus();
    setTimeout((): void => {
      this.input.element.nativeElement.select();
    });
  }

  private isKeyPressedNumeric(event: any): boolean {
    let charCode: any = (event.which) ? event.which : event.keyCode;
    return !(charCode != 46 && charCode > 31
    && (charCode < 48 || charCode > 57));
  }
}
