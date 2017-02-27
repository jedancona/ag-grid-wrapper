import {Component, Optional} from '@angular/core';
import {BaseGridComponent} from '../base-grid';
import { MdDialogRef } from '@angular/material';
import { TableColumnLookupDialog } from '../../components/module';

@Component({
  selector: 'single-select-grid',
  templateUrl: 'app/examples/single-select-grid/single-select-grid.component.tpl.html',
})
export class SingleSelectGridComponent extends BaseGridComponent implements TableColumnLookupDialog {

  public selectedItem: any = {};

  constructor(@Optional() private dialogRef: MdDialogRef<any>) {
    super();
  }

  public saveRow = (rowEntity: any): Promise<any> => {
    let self = this;
    return new Promise(resolve => {
      setTimeout(() => resolve(self.processResolve(rowEntity)), 5000);
    });
  };

  public selectedRow=(event:any) :void => {
    console.log('selected row', event);
  };

  public processResolve = (rowEntity: any): any => {
    return {success: rowEntity};
  };

}
