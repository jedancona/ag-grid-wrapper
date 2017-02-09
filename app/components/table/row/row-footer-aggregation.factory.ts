/* tslint:disable */
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import * as _ from "lodash";
import {TableComponent} from "../table.component";
import {ColDef, RowNode} from "ag-grid";

@Injectable()
export class RowFooterAggregationFactory {

  constructor() {
  }

  public registerGridListener = (onGridApiRegistered: Subject<any>): void => {
    onGridApiRegistered.subscribe(this._onGridApiRegistered)
  };

  public unRegisterGridListener = (table: TableComponent): void => {
    table.cellValueChanged.unsubscribe();
  };

  private _onGridApiRegistered = (table: TableComponent): void => {
    this.setupFooterRowData(table.api);
    table.cellValueChanged.subscribe(this.onCellValueChanged);
  };

  private setupFooterRowData = (grid: any): void => {
    let footerRowKeys: any = [];
    let footerRowDesc: any = [];
    let footerRowValue: any = [];
    let columnDefs = grid.gridCore.gridOptions.columnDefs;
    let numColumns = columnDefs.length;
    for (var i = 0; i < numColumns; i++) {
      let col = columnDefs[i] as ColDef;
      footerRowKeys.push(col.field);
      footerRowDesc.push(col.headerName);
      footerRowValue.push(this.getColumnCalcValue(grid, col.field));
    }
    let footerRowLabelData = _.zipObject(footerRowKeys, footerRowDesc);
    let footerRowValueData = _.zipObject(footerRowKeys, footerRowValue);
    grid.setFloatingBottomRowData([footerRowLabelData, footerRowValueData]);
  };

  public reCalcAllColumns = (grid: any): void => {
    let columnDefs = grid.gridCore.gridOptions.columnDefs;
    let numColumns = columnDefs.length;
    for (var i = 0; i < numColumns; i++) {
      this.reCalcColumn(grid, columnDefs[i].field);
    }
  };

  public setRowFooterData = (grid: any, data: any): void => {
    grid.floatingRowModel.floatingBottomRows[1].data = data;
    grid.rowRenderer.refreshAllFloatingRows();
  };

  private getColumnCalcValue = (grid: any, field: string): any => {
    let colDef: any = grid.getColumnDef(field);
    if (colDef) {
      switch (colDef.aggregationType) {
        case 'sum':
          return this.getColumnValuesSum(grid, field);
        case 'avg':
          return this.getColumnValuesAvg(grid, field);
        case 'max':
          return this.getColumnValuesMax(grid, field);
        case 'min':
          return this.getColumnValuesMin(grid, field);
        case 'net':
          return this.getColumnValuesNet(grid, field);
        default:
          return 0;
      }

    } else {
      return 0;
    }
  };

  private getColumnValuesSum = (grid: any, field: string): number => {
    return _.sum(this.getCellValues(grid, field));
  };

  private getColumnValuesAvg = (grid: any, field: string): number => {
    return this.getColumnValuesSum(grid, field) / grid.inMemoryRowModel.getRowCount();
  };

  private getColumnValuesMax = (grid: any, field: string): number => {
    return Math.max.apply(null, this.getCellValues(grid, field));
  };

  private getColumnValuesMin = (grid: any, field: string): number => {
    return Math.min.apply(null, this.getCellValues(grid, field));
  };

  /*
   aggregationTypeNetExpressionModel
   {
   keyCol: 'column1',
   key1: 'D',
   key2: 'R'
   }
   */
  private getColumnValuesNet = (grid: any, field: string): number => {
    let colDef = grid.getColumnDef(field);
    if (colDef && colDef.aggregationTypeNetExpression) {
      let netExpression = colDef.aggregationTypeNetExpression;
      let key1Values = this.getCellValuesByKey(grid, field, netExpression.keyCol, netExpression.key1);
      let key2Values = this.getCellValuesByKey(grid, field, netExpression.keyCol, netExpression.key2);

      return _.sum(key1Values) - _.sum(key2Values);

    }
    return 0;
  };

  private getCellValuesByKey = (grid: any, field: string, keyField: string, keyFieldValue: string): Array<number> => {
    let cellValueArray: Array<number> = [];
    grid.forEachNode((rowNode: RowNode) => {
      if (rowNode.data[keyField] === keyFieldValue) {
        cellValueArray.push(Number(rowNode.data[field]));
      }
    });
    return cellValueArray;
  };

  public getCellValues = (grid: any, field: string): Array<number> => {
    let cellValueArray: Array<any> = [];
    grid.forEachNode((rowNode: RowNode) => {
      cellValueArray.push(Number(rowNode.data[field]));
    });
    return cellValueArray;
  };

  private reCalcColumn = (grid: any, field: string) => {
    let footerRowValueData: any = grid.getFloatingBottomRow(1).data;
    footerRowValueData[field] = this.getColumnCalcValue(grid, field);
    this.setRowFooterData(grid, footerRowValueData);
  };

  private onCellValueChanged = ($event: any): void => {
    if ($event.colDef.aggregationType) {
      this.reCalcColumn($event.api, $event.colDef.field);
    }
  };
}
