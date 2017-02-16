/* tslint:disable */
import { Component, ViewEncapsulation, Input, ContentChildren, QueryList, OnDestroy } from '@angular/core';
import { ColDef } from 'ag-grid/main';
import { TableComponent } from '../table.component';

@Component({
  selector: 'ui-table-column',
  template: '',
  // tell angular we don't want view encapsulation, we don't want a shadow root
  encapsulation: ViewEncapsulation.None
})

export class TableColumnComponent implements OnDestroy{

  @ContentChildren(TableColumnComponent) public childColumns: QueryList<TableColumnComponent>;

  constructor(private tableComponent: TableComponent) {
    this.tableComponent.addColumn(this);
  }

  ngOnDestroy(): void {
    this.tableComponent.removeColumn(this);
  }

  public hasChildColumns(): boolean {
    if (this.childColumns && this.childColumns.length > 0) {
      // necessary because of https://github.com/angular/angular/issues/10098
      return !(this.childColumns.length === 1 && this.childColumns.first === this);
    }
    return false;
  }

  public toColDef(): ColDef {
    /*this.setColumnTypeEditor();
     this.setColumnCellFilter();*/
    let colDef: ColDef = this.createColDefFromGridColumn(this);
    if (this.hasChildColumns()) {
      (<any>colDef)[ "children" ] = this.getChildColDefs(this.childColumns);
    }
    return colDef;
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

  @Input('aggregationType') public aggregationType: string = undefined;
  @Input('aggregationTypeNetExpression') public aggregationTypeNetExpression: any = undefined;
  @Input('cellClass') public cellClass: string = undefined;
  @Input('display-name') public headerName: string = undefined;
  @Input('editDropdownCode') public editDropdownCode: string = undefined;
  @Input('editDropdownOptionsArray') public editDropdownOptionsArray: Array<any> = undefined;
  @Input('editDropdownValueId') public editDropdownValueId: string = undefined;
  @Input('editDropdownValueLabel') public editDropdownValueLabel: string = undefined;
  @Input('enableMovable') public suppressMovable: boolean = true;
  @Input('type') public type: string = undefined;
  @Input() public lookupComponent: any = undefined;

  /**
   * Used to denote the model type to use for the toggle-select and checkbox column types.
   * @modelType {string} used to denote the type of model valid values are yesno, onezero.
   *                      yesno will make the toggle select use Y and N.
   *                      onezero will make the toggle select use 1 and 0.
   *                      default will make the toggle select use true and false.
   */
  @Input('modelType') public modelType: string = undefined;
  @Input('name') public field: any = undefined;
  @Input('enable-edit') public editable: boolean = false;
  @Input('cell-editor') public cellEditor: string = undefined;
  @Input('minWidth') public minWidth: number = 50;
  @Input('cell-filter') public cellFilter: string = undefined;
  @Input('floatingCellRenderer') public floatingCellRenderer: any = undefined;

}
