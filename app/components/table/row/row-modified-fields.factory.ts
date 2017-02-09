import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import * as _ from 'lodash';
import {TableComponent} from '../table.component';

@Injectable()
export class RowModifiedFieldsFactory {

  constructor() {
  }

  public registerGridListener = (onGridApiRegistered: Subject<any>): void => {
    onGridApiRegistered.subscribe(this._onGridApiRegistered)
  };

  public unRegisterGridListener = (table: TableComponent): void => {
    table.cellValueChanged.unsubscribe();
  };

  private _onGridApiRegistered = (table: TableComponent): void => {
    table.cellValueChanged.subscribe(this.onCellValueChanged);
  };

  private onCellValueChanged = ($event: any): void => {
    // fires on cell editing stopped regardless of whether value changed.
    this.setModifiedField($event.node, $event.colDef, $event.newValue, $event.oldValue);
  };

  private setModifiedField = (gridRow: any, colDef: any, newValue: any, oldValue: any): void => {
    if (_.isUndefined(gridRow.data.modifiedFields)) {
      gridRow.data.modifiedFields = [];
    }
    if (newValue !== oldValue) {
      if (gridRow.data.modifiedFields.indexOf(colDef.field) === -1) {
        gridRow.data.modifiedFields.push(colDef.field);
      }
    }
  }
}
