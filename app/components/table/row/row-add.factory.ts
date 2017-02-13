import {Injectable} from '@angular/core';
import {TableComponent} from '../table.component';

@Injectable()
export class RowAddFactory {

  constructor() {
  }

  public unRegisterGridListener = (table: TableComponent): void => {
    this.setAddRowApi(table);
  };

  public onGridApiRegistered = (table: TableComponent): void => {

  };

  private setAddRowApi = (table: any) => {

  };
}
