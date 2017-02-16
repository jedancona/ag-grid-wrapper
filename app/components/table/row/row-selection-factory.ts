import { Injectable } from "@angular/core";
import { TableComponent } from "../table.component";
import { ColDef } from "ag-grid";

@Injectable()
export class TableRowSelectionFactory {

  private selectCol: ColDef;
  constructor() {
  }

  public unRegisterGridListener = (table: TableComponent): void => {
    table.rowSelected.unsubscribe();
  };

  public onGridApiRegistered = (table: TableComponent, col: ColDef): void => {
    debugger;
    this.selectCol = col;
    table.rowSelected.subscribe(this.onRowSelected);
  };

  public onRowSelected = (event: any): void => {
    console.log('onRowSelected, factory style', event);
  }
}
