/* tslint:disable */
import { Component, ViewContainerRef, ViewChild, AfterViewInit } from '@angular/core';
import { AgEditorComponent } from 'ag-grid-ng2/main';
import { MdDialog } from '@angular/material';
import { TableColumnLookupBaseComponent } from './lookup-base.component';

@Component({
  moduleId: module.id + '',
  selector: 'table-column-lookup-editor',
  templateUrl: './lookup-editor.component.tpl.html'
})
export class TableColumnLookupEditorComponent extends TableColumnLookupBaseComponent implements AgEditorComponent, AfterViewInit {
  private cancelBeforeStart: boolean = false;
  private lookupType: string = 'text';

  @ViewChild('input', { read: ViewContainerRef }) public input: any;

  constructor(dialog: MdDialog) {
    super(dialog);
  }

  agInit(params: any): void {
    this.params = params;
    this.value = this.params.value;
    console.debug(params);

    //this.cancelBeforeStart = params.charPress && ('1234567890'.indexOf(params.charPress) < 0);

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

  protected setLookupKeyValue = (lookupKey: any, item: any): void => {
    if (lookupKey) {
      console.debug('editor set key', lookupKey);
      this.input.element.nativeElement.value = item[ lookupKey ];
    }
    else {
      // Warning lookupKey is not defined on the column.
    }
  };
}
