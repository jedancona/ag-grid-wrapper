import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { TableColumnLookupDialogComponent } from './lookup-dialog.component';

export class TableColumnLookupBaseComponent {
  protected params: any;
  protected value: number;

  constructor(protected dialog: MdDialog) {
  }

  protected openDialog = ($event: any): void => {
    console.debug('open dialog', this.params);
    $event.preventDefault();
    $event.stopPropagation();
    let data: any = {
      component: this.params.column.colDef.lookupComponent,
      itemData: this.params.node.data
    };

    let config: MdDialogConfig = {
      width: '80%',
      height: '80%',
    };

    let dialogRef: any = this.dialog.open(TableColumnLookupDialogComponent, config);

    dialogRef.componentInstance.data = data;
    dialogRef.afterClosed().subscribe(this.closedDialog)
  };

  protected closedDialog = (result: any) => {
    console.debug('dialog closed', result);
  };
}

