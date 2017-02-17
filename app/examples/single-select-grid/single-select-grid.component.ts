import {Component, Optional} from '@angular/core';
import {BaseGridComponent} from '../base-grid';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'single-select-grid',
  templateUrl: 'app/examples/single-select-grid/single-select-grid.component.tpl.html',
})
export class SingleSelectGridComponent extends BaseGridComponent {

  constructor(@Optional() private dialogRef: MdDialogRef<any>) {
    super();
  }

  public saveRow = (rowEntity: any): Promise<any> => {
    let self = this;
    return new Promise(resolve => {
      setTimeout(() => resolve(self.processResolve(rowEntity)), 5000);
    });
  };

  public processResolve = (rowEntity: any): any => {
    console.debug('SavingRow', rowEntity);
    if(this.dialogRef){
      this.dialogRef.close(rowEntity);
    }
    return {success: 'true'};
  };

}
