/* tslint:disable */
import {Component, ViewEncapsulation, Input, ContentChildren, QueryList} from "@angular/core";
import {GridApi, ColumnApi, GridParams, ColDef} from "ag-grid/main";
import * as _ from "lodash";
import {NumericEditorComponent} from "../editors/numeric-editor";
import {TextEditorComponent} from "../editors/text-editor";
import { DateCellRendererComponent } from "../cell/render/date-cell-renderer.component";
import { ETCodeCellRendererComponent } from "../cell/render/et-code-cell-renderer.component";
import {DefaultCellRendererComponent} from "../cell/render/default-cell-renderer.component";
import {isNullOrUndefined} from "util";

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
  public cellRendererFramework: any;

  @ContentChildren(TableColumnComponent) public childColumns: QueryList<TableColumnComponent>;

  constructor() {
    _.defaults(this, {
      minWidth: 50,
      suppressMovable: true,
    });
  }

  public hasChildColumns(): boolean {
    if (this.childColumns && this.childColumns.length > 0) {
      // necessary because of https://github.com/angular/angular/issues/10098
      return !(this.childColumns.length === 1 && this.childColumns.first === this);
    }
    return false;
  }

  public toColDef(): ColDef {
    this.setColumnTypeEditor();
    this.setColumnCellFilter();
    let colDef: ColDef = this.createColDefFromGridColumn(this);

    if (this.hasChildColumns()) {
      (<any>colDef)["children"] = this.getChildColDefs(this.childColumns);
    }

    return colDef;
  }

  private setColumnTypeEditor(): void {
    if(this.editable) {
      this.cellClass = 'editable';
      if (!this.type || this.type === 'text') {
        this.cellEditorFramework = TextEditorComponent;

      }
      if (this.type === 'number') {
        this.cellEditorFramework = NumericEditorComponent;
      }
    }
  }

  private setColumnCellFilter = () : void => {
    if(this.type === 'date'){
      this.cellRendererFramework = DateCellRendererComponent;
      if(this.cellFilter){
        console.log('date with a filter', this.cellFilter);
      }
    }
    else {
      this.cellRendererFramework = DefaultCellRendererComponent;
    }
  }

  private getChildColDefs(childColumns: QueryList<TableColumnComponent>) {
    return childColumns
    // necessary because of https://github.com/angular/angular/issues/10098
      .filter(column => !column.hasChildColumns())
      .map((column: TableColumnComponent) => {
        return column.toColDef();
      });
  };

  private createColDefFromGridColumn(from: TableColumnComponent): ColDef {
    let colDef: ColDef = {};
    Object.assign(colDef, from);
    delete (<any>colDef).childColumns;
    return colDef;
  };

  @Input('display-name') public headerName: string = undefined;

  @Input('cellClass') public cellClass: string = undefined;
  @Input('enableMovable') public suppressMovable: boolean = true;
  @Input('type') public type: string = undefined;
  @Input('name') public field: any = undefined;
  @Input('enable-edit') public editable: boolean = true;
  @Input('cell-editor') public cellEditor: string = undefined;
  @Input('minWidth') public minWidth: number = undefined;
  @Input('cell-filter') public cellFilter: string = undefined;
  @Input('floatingCellRenderer') public floatingCellRenderer: any = undefined;
  @Input('aggregationType') public aggregationType: string = undefined;
  @Input('aggregationTypeNetExpression') public aggregationTypeNetExpression: any = undefined;


}
