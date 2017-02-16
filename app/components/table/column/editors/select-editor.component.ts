import {Component} from "@angular/core";
import {AgEditorComponent} from "ag-grid-ng2/main";

@Component({
  selector: 'select-editor',
  template: `<div class="select-editor">
               <md-select selectEditorOpenSelect (onClose)="onSelectClose()" [(ngModel)]="value" >
                <md-option *ngFor="let field of params.column.colDef.editDropdownOptionsArray" [value]="field[editDropdownId]">
                  {{ field[editDropdownLabel] }}
                </md-option>
              </md-select>
            </div>`
})
export class TableColumnEditSelectDropdownComponent implements AgEditorComponent {
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
