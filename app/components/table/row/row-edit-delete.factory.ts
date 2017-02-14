import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { TableComponent } from '../table.component';

@Injectable()
export class TableRowEditDeleteFactory {

  constructor() {
  }

  public unRegisterGridListener = (table: TableComponent): void => {
    this.removeDeleteRowApi(table.api);
  };

  public onGridApiRegistered = (table: TableComponent): void => {
    this.setDeleteRowApi(table.api);
  };

  private setDeleteRowApi = (grid: any) => {
    _.defaultsDeep(grid, {
      rowEdit: {
        deleteRowByData: (gridRowData: any): void => {
          if (gridRowData) {

            let gridRowArray: Array<any> = [];

            grid.forEachNode(( gridRow: any): void => {
              gridRowArray.push(gridRow.data);
            });

            let rowIndex: number = gridRowArray.indexOf(gridRowData);
            let rowNode: any = grid.getModel().getRow(rowIndex);
            grid.removeItems([ rowNode ]);
          }
        },
        deleteRowByIndex: (rowIndex: number): void => {
          let rowNode: any = grid.getModel().getRow(rowIndex);
          grid.removeItems([ rowNode ]);
        }
      }
    });
  };

  private removeDeleteRowApi = (grid: any): void => {
    delete grid.rowEdit.deleteRowByData;
    delete grid.rowEdit.deleteRowByIndex;
  };


}
