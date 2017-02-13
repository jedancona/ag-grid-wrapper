/* tslint:disable */
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { TableComponent } from '../table.component';

@Injectable()
export class TableRowEditFactory {

  constructor() {
  }

  public unRegisterGridListener = (table: TableComponent): void => {
    table.cellValueChanged.unsubscribe();
    this.destroyPublicApi(table.api);
  };

  public onGridApiRegistered = (table: TableComponent): void => {
    this.setupPublicApi(table.api);
    table.cellValueChanged.subscribe(this.onCellValueChanged);
  };

  private setupPublicApi = (grid: any): void => {
    _.defaultsDeep(grid, {
      rowEdit: {
        getDirtyRows: this.getDirtyRows,
        getErrorRows: this.getErrorRows,
        dirtyRows: [],
        errorRows: [],
      }
    });
  };

  private destroyPublicApi = (grid: any): void => {
    _.defaultsDeep(grid, {
      rowEdit: {
        getDirtyRows: null,
        getErrorRows: null,
        dirtyRows: null,
        errorRows: null,
      }
    });
  };

  /**
   * @ngdoc method
   * @methodOf table.factories:TableRowEditFactory
   * @name getDirtyRows
   * @description Returns all currently dirty rows
   * <pre>
   *      gridApi.rowEdit.getDirtyRows(grid)
   * </pre>
   * @returns {array} An array of gridRows that are currently dirty
   *
   */
  public getDirtyRows = (grid: any): Array<any> => {
    return grid.rowEdit.dirtyRows ? grid.rowEdit.dirtyRows : [];
  };

  /**
   * @ngdoc method
   * @methodOf table.factories:TableRowEditFactory
   * @name getErrorRows
   * @description Returns all currently errored rows
   * <pre>
   *      gridApi.rowEdit.getErrorRows(grid)
   * </pre>
   * @returns {array} An array of gridRows that are currently in error
   *
   */
  public getErrorRows = (grid: any): Array<any> => {
    return grid.rowEdit.errorRows ? grid.rowEdit.errorRows : [];
  };

  private onCellValueChanged = ($event: any): void => {
    // fires on cell editing stopped regardless of whether value changed.
    this.cellValueChanged($event.api, $event.node, $event.colDef, $event.newValue, $event.oldValue);
  };

  private cellValueChanged = (grid: any, gridRow: any, colDef: any, newValue: any, oldValue: any): void => {
    if (!gridRow) {
      // console.debug('Unable to find rowEntity in grid data, dirty flag cannot be set');
      return;
    }
    if (newValue !== oldValue) {
      if (_.isUndefined(gridRow.data.dirtyStatus)) {
        gridRow.data.dirtyStatus = 2;
      } else if (gridRow.data.dirtyStatus !== 1) {
        gridRow.data.dirtyStatus = 2;
      }
      this.setGridRowDirty(grid, gridRow);
    }
  };

  private setGridRowDirty = (grid: any, gridRow: any): void => {
    if (!gridRow.isDirty) {
      gridRow.isDirty = true;
      grid.rowEdit.dirtyRows.push(gridRow);
    }
  };
}
