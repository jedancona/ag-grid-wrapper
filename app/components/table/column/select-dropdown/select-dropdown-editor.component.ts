import { Component } from "@angular/core";
import { AgEditorComponent } from "ag-grid-ng2/main";

@Component({
  moduleId: module.id,
  selector: 'table-column-select-dropdown-editor',
  template: './select-dropdown-editor.component.tpl.html'
})
export class TableColumnSelectDropdownEditorComponent implements AgEditorComponent {
  private params: any;
  private editDropdownLabel: string;
  private editDropdownId: string;
  private cancelBeforeStart: boolean = false;

  public value: number;

  agInit(params: any): void {
    this.params = params;
    this.editDropdownLabel = this.params.column.colDef.editDropdownValueId;
    this.editDropdownId = this.params.column.colDef.editDropdownValueLabel;
    this.value = this.params.value;

    // if the row is floating a.k.a footer row do not allow editing.
    if (this.params.node.floating) {
      this.cancelBeforeStart = true;
    }
  }

  onSelectClose() {
    this.params.api.stopEditing();
  }

  getValue(): any {
    return this.value;
  }

  isCancelBeforeStart(): boolean {
    return this.cancelBeforeStart;
  }

}
