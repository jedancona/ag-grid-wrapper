/* tslint:disable */
import { ViewEncapsulation, Component } from "@angular/core";
import { AgRendererComponent } from "ag-grid-ng2";
import { RowNode } from "ag-grid";
import { Validator } from "codelyzer/walkerFactory/walkerFn";

@Component({
  moduleId: module.id,
  selector: 'row-single-select',
  templateUrl: './row-single-select.component.tpl.html',
  // tell angular we don't want view encapsulation, we don't want a shadow root
  encapsulation: ViewEncapsulation.None
})

export class RowSingleSelectComponent implements AgRendererComponent {
  private params: any;
  private rowNode: RowNode;
  private column: any;
  private isSelected: boolean;

  agInit(params: any): void {
    this.params = params
    this.rowNode = params.node;
    console.log("is it selected,", this.rowNode.isSelected());
    this.column = params.column;
    this.addRowSelectedListener();
  }

  public onBlur = (test: any): void => {
    this.isSelected = this.rowNode.isSelected();
    console.log('in the onBlur of the row single select', this.rowNode);
    //this.params.api.gridCore.gridOptions.onCellEditingStopped.emit(this.params);
  }

  private addRowSelectedListener = (): void => {
    let cellChangeListener = (event: any) => {
      if (event.column === this.column) {
        console.log('in the cellChange of the row single select', this.rowNode);
      }
    };
    this.addDestroyableEventListener(this.rowNode, RowNode.EVENT_ROW_SELECTED, this.onBlur);
  }
  public addDestroyableEventListener = (eElement: RowNode, event: string, listener: (event?: any) => void): void => {
    eElement.addEventListener(event, listener);
  }

}
