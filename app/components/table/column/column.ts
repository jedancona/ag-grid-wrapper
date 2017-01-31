import {Component, ViewEncapsulation, Input, AfterViewInit} from "@angular/core";
import {GridApi, ColumnApi, GridParams} from "ag-grid/main";
import {TableComponent} from "../table";
import * as _ from "lodash";
import {NumericEditorComponent} from "../editors/numeric-editor/numeric-editor";

@Component({
  selector: 'ui-table-column',
  template: '',
  // tell angular we don't want view encapsulation, we don't want a shadow root
  encapsulation: ViewEncapsulation.None
})

export class TableColumnComponent {

  private gridParams: GridParams;

  private colDef: any = {};
  // making these public, so they are accessible to people using the ng2 component references
  public api: GridApi;
  public columnApi: ColumnApi;
  public cellEditorFramework: any;

  constructor(private table: TableComponent) {
    _.defaults(this, {
      minWidth: 50,
      suppressMovable: true,
    });
    this.cellEditorFramework =  NumericEditorComponent;
    this.table.addColumn(this);
  }

  @Input('display-name') public headerName: string = undefined;
  @Input('enableMovable') public suppressMovable: boolean = false;
  @Input('type') public type: string = undefined;
  @Input('name') public field: any = undefined;
  @Input('enable-edit') public editable: boolean = true;
  @Input('cell-editor') public cellEditor: string = undefined;
  @Input('minWidth') public minWidth: number = undefined;


}
