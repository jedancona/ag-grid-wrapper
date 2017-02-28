import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import * as _ from 'lodash';
import { TableColumnLookupDialogComponent } from './lookup-dialog.component';

export class TableColumnLookupBaseComponent {
  protected params: any;
  protected value: number;

  constructor(protected dialog: MdDialog) {
  }

  protected openDialog = ($event: any): void => {
    $event.preventDefault();
    $event.stopPropagation();

    let modalWidth: string = _.clone(this.params.column.colDef.lookupModalWidth);
    let modalHeight: string = _.clone(this.params.column.colDef.lookupModalHeight);

    let data: any = {
      component: this.params.column.colDef.lookupComponent,
      itemData: this.params.node.data,
      colDef: this.params.column.colDef,
    };

    let config: MdDialogConfig = {
      width: modalWidth,
      height: modalHeight,
    };

    let dialogRef: any = this.dialog.open(TableColumnLookupDialogComponent, config);

    dialogRef.componentInstance.data = data;
    dialogRef.afterClosed().subscribe(this.closedDialog)
  };

  protected closedDialog = (result: any) => {
    if (this.params &&
      this.params.column &&
      this.params.column.colDef && result) {
      this.setLookupRowValue(this.params.column.colDef, result);
      if (this.params.column.colDef.lookupCallback) {
        this.params.column.colDef.lookupCallback.emit(result);
      }
    }
  };

  protected setLookupRowValue = (colDef: any, item: any): void => {
    let lookupAction: string = colDef.lookupAction;
    let lookupKey: string = colDef.lookupKey;
    switch (lookupAction) {
      case 'assign':
        this.setLookupAssignValue(item);
        break;
      default:
        this.setLookupKeyValue(lookupKey, item);
    }
  };

  protected setLookupKeyValue = (lookupKey: any, item: any): void => {
    if (lookupKey && item && item [ lookupKey ]) {
      this.params.api.valueService.setValue(this.params.node, this.params.column.colId, item [ lookupKey ]);
      this.params.api.refreshCells([ this.params.node ], [ this.params.column.colId ], true);
    }
    else {
      // Warning lookupKey is not defined on the column.
    }
  };

  protected setLookupAssignValue = (item: any): void => {
    _.assignIn(this.params.node.data,item);
    this.params.api.softRefreshView();
  };
}

