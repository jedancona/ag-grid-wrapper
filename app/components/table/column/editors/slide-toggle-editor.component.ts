import { Component } from "@angular/core";
import { AgEditorComponent } from "ag-grid-ng2/main";

@Component({
  selector: 'slide-toggle-editor',
  template: ''
})
export class TableColumnEditorSlideToggleComponent implements AgEditorComponent {
  private params: any;
  private cancelBeforeStart: boolean;
  private value: any;

  agInit(params: any): void {
    this.params = params;
    this.value = this.params.value;
    this.cancelBeforeStart = true;
  }

  getValue(): any {
    return this.value;
  }

  isCancelBeforeStart(): boolean {
    return this.cancelBeforeStart;
  }

}
