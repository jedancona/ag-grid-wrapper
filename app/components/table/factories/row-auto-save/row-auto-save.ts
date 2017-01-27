import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {TableComponent} from "../../table";

@Injectable()
export class RowAutoSaveFactory {

  private grid: any;
  private debugStr: string = 'RowAutoSaveFactory: ';
  constructor() {}

  public setGridOptions = (grid: any) => {
    this.grid = grid;
  };

  public setGridRegisteredListener = (onGridApiRegistered: Subject<any>): void => {
    onGridApiRegistered.subscribe(this._onGridApiRegistered)
  };

  private _onGridApiRegistered = (grid: TableComponent): void => {
    this.grid = grid;
    this.grid.cellClicked.subscribe(this.onCellClicked);

    this.grid.rowEditingStarted.subscribe(this.onRowEditingStarted);
    this.grid.rowEditingStopped.subscribe(this.onRowEditingStopped);
    this.grid.cellEditingStarted.subscribe(this.onCellEditingStarted);
    this.grid.cellEditingStopped.subscribe(this.onCellEditingStopped);
  };

  private onCellClicked = ($event: any): void => {
    console.debug('factory: ' + $event.rowIndex + ' ' + $event.colDef.field);
  };

  private onRowEditingStarted = ($event: any): void => {
    console.debug(this.debugStr + 'onRowEditingStarted', $event);
  };

  private onRowEditingStopped = ($event: any): void => {
    console.debug(this.debugStr + 'onRowEditingStopped', $event);
  };

  private onCellEditingStarted = ($event: any): void => {
    console.debug(this.debugStr + 'onCellEditingStarted', $event);
  };

  private onCellEditingStopped = ($event: any): void => {
    console.debug(this.debugStr + 'onCellEditingStopped', $event);
  };
}
