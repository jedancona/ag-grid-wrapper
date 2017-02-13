/* tslint:disable */
import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {TableComponent} from '../table.component';

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
        dirtyRows: [],
        errorRows: [],
      }
    });
  };

  private destroyPublicApi = (grid: any): void => {
    _.defaultsDeep(grid, {
      rowEdit: {
        dirtyRows: null,
        errorRows: null,
      }
    });
    delete grid.rowEdit;
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
      if (!gridRow.isDirty) {
        gridRow.isDirty = true;
        grid.rowEdit.dirtyRows.push(gridRow);
      }
    }
  };
}
