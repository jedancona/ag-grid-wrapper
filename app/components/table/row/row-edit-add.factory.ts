import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { TableComponent } from '../table.component';

@Injectable()
export class TableRowEditAddFactory {

  constructor() {
  }

  public unRegisterGridListener = (table: TableComponent): void => {
    this.removeAddRowApi(table.api);
  };

  public onGridApiRegistered = (table: TableComponent): void => {
    this.setAddRowApi(table.api);
  };

  private setAddRowApi = (grid: any) => {
    _.defaultsDeep(grid, {
      rowEdit: {
        addRow: (gridRowData: any, scrollToFocusCol?: string): number => {
          if (gridRowData) {
            _.assign(gridRowData, {
              dirtyStatus: 1,
            });
            grid.addItems([ gridRowData ]);
            let rowIdx: number = grid.rowModel.getRowCount() - 1;
            let gridRow: any = grid.rowModel.getRow(rowIdx);
            _.assign(gridRow, {
              newValidation: true,
              isDirty: true
            });
            grid.refreshRows([ gridRow ]);
            grid.ensureIndexVisible(rowIdx);
            if (scrollToFocusCol) {
              grid.ensureColumnVisible(scrollToFocusCol);
              grid.setFocusedCell(rowIdx, scrollToFocusCol, null);
              grid.startEditingCell({
                rowIndex: rowIdx,
                colKey: scrollToFocusCol,
              });
            }
            return rowIdx;
          }
          return null;
        },
      }
    });

  };

  private removeAddRowApi = (grid: any): void => {
    delete grid.rowEdit.addRow;
  };

}
