import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import * as _ from "lodash";
import {TableComponent} from "../../table";

@Injectable()
export class RowAutoSaveFactory {

  private grid: any;
  private savePromise: any;

  private dirtyRows: Array<any> = [];
  private errorRows: Array<any> = [];

  private debugStr: string = 'RowAutoSaveFactory: ';

  constructor() {
  }

  private _onGridApiRegistered = (grid: TableComponent): void => {
    this.grid = grid;
    this.setupPublicApi();

    this.savePromise = this.grid.onSaveRow;

    this.grid.cellFocused.subscribe(this.onCellFocused);
    this.grid.selectionChanged.subscribe(this.onSelectionChanged);
    this.grid.rowSelected.subscribe(this.onRowSelected);
    this.grid.cellEditingStarted.subscribe(this.onCellEditingStarted);
    this.grid.cellEditingStopped.subscribe(this.onCellEditingStopped);
    this.grid.cellValueChanged.subscribe(this.onCellValueChanged);
  };

  private setupPublicApi = (): void => {
    _.defaultsDeep(this.grid.api, {
      rowEdit: {
        setSavePromise: this.setSavePromise,
        getDirtyRows: this.getDirtyRows,
        getErrorRows: this.getErrorRows,
        flushDirtyRows: this.flushDirtyRows,
        setRowsDirty: this.setRowsDirty,
        setRowsClean: this.setRowsClean,
      }
    })
  };

  public setGridRegisteredListener = (onGridApiRegistered: Subject<any>): void => {
    onGridApiRegistered.subscribe(this._onGridApiRegistered)
  };

  /**
   * @ngdoc method
   * @methodOf table.factories:RowAutoSaveFactory
   * @name saveRow
   * @description  Returns a function that saves the specified row from the grid,
   * and returns a promise
   * @param {object} grid the grid for which dirty rows should be flushed
   * @param {GridRow} gridRow the row that should be saved
   * @returns {function} the saveRow function returns a function.  That function
   * in turn, when called, returns a promise relating to the save callback
   */
  private saveRow = (grid: TableComponent, gridRow: any): any => {
    let self = this;

    return (): Promise<any> => {
      if (gridRow.rowEditSavePromise) {
        return gridRow.rowEditSavePromise;
      }
      let promise: Promise<any> = self.savePromise(gridRow.data);
      this.setSavePromise(gridRow, promise);
      if (self.savePromise) {
        gridRow.rowEditSavePromise.then(self.processSuccessPromise(grid, gridRow), self.processErrorPromise(grid, gridRow));
      } else {
        console.error('A promise was not returned when saveRow event was raised, either nobody is listening to event or event did not return a promise');
      }

      return promise;
    };
  };

  /**
   * @ngdoc method
   * @methodOf  table.factories:RowAutoSaveFactory
   * @name setSavePromise
   * @description Sets the promise associated with the row save, mandatory that
   * the saveRow event handler calls this method somewhere before returning.
   * @param {object} rowEntity a data row from the grid for which a save has
   * been initiated
   * @param {promise} savePromise the promise that will be resolved when the
   * save is successful, or rejected if the save fails
   *
   */
  public setSavePromise = (gridRow: any, savePromise: Promise <any>): void => {
    gridRow.rowEditSavePromise = savePromise;
  };

  /**
   * @ngdoc method
   * @methodOf table.factories:RowAutoSaveFactory
   * @name processSuccessPromise
   * @description  Returns a function that processes the successful
   * resolution of a save promise
   * @param {object} grid the grid for which the promise should be processed
   * @param {GridRow} gridRow the row that has been saved
   * @returns {function} the success handling function
   */
  private processSuccessPromise = (grid: TableComponent, gridRow: any): any => {
    var self = this;
    return (): any => {
      this.cancelTimer(grid, gridRow);
      delete gridRow.isSaving;
      delete gridRow.isDirty;
      delete gridRow.isError;
      delete gridRow.rowEditSaveTimer;
      delete gridRow.rowEditSavePromise;
    };
  };

  /**
   * @ngdoc method
   * @methodOf table.factories:RowAutoSaveFactory
   * @name processErrorPromise
   * @description  Returns a function that processes the failed
   * resolution of a save promise
   * @param {object} grid the grid for which the promise should be processed
   * @param {GridRow} gridRow the row that is now in error
   * @returns {function} the error handling function
   */
  private processErrorPromise = (grid: any, gridRow: any): any => {
    return (): any => {
      delete gridRow.isSaving;
      delete gridRow.rowEditSaveTimer;
      delete gridRow.rowEditSavePromise;

      gridRow.isError = true;
      if (!this.errorRows) {
        this.errorRows = [];
      }
      this.errorRows.push(gridRow);
    };
  };

  /**
   * @ngdoc method
   * @methodOf table.factories:RowAutoSaveFactory
   * @name removeRow
   * @description  Removes a row from a cache of rows - either
   * grid.rowEdit.errorRows or grid.rowEdit.dirtyRows.  If the row
   * is not present silently does nothing.
   * @param {array} rowArray the array from which to remove the row
   * @param {GridRow} gridRow the row that should be removed
   */
  private removeRow = (rowArray: Array<any>, removeGridRow: any): void => {
    if (!rowArray) {
      return;
    }
    rowArray.forEach((gridRow: any, index: number): void => {
      if (gridRow.id === removeGridRow.id) {
        rowArray.splice(index, 1);
      }
    });
  };

  /**
   * @ngdoc method
   * @methodOf table.factories:RowAutoSaveFactory
   * @name beginEditCell
   * @description Receives a beginCellEdit event from the edit function,
   * and cancels any rowEditSaveTimers if present, as the user is still editing
   * this row.  Only the rowEntity parameter
   * is processed, although other params are available.  Grid
   * is automatically provided by the gridApi.
   * @param {object} gridRow the grid row node for which the cell
   * was edited
   * editing has commenced
   */
  private beginCellEdit = (gridRow: any, colDef?: any): void => {
    let grid = this.grid;
    if (!gridRow) {
      console.debug('Unable to find row in grid data, time cannot be cancelled');
      return;
    }
    this.cancelTimer(grid, gridRow);
  };

  /**
   * @ngdoc method
   * @methodOf table.factories:RowAutoSaveFactory
   * @name endEditCell
   * @description Receives an afterCellEdit event from the edit function,
   * and sets flags as appropriate.  Only the rowEntity parameter
   * is processed, although other params are available.  Grid
   * is automatically provided by the gridApi.
   * @param {object} gridRow the grid row node for which the cell
   * was edited
   * @param {object} colDef the column definition for which the cell
   * was edited
   * @param {object} newValue the newValue of the cell that was edited
   * @param {object} oldValue the oldValue of the cell that was edited
   */
  private endCellEdit = (gridRow: any, colDef: any, newValue: any, previousValue: any): void => {
    let grid = this.grid;
    if (!gridRow) {
      console.debug('Unable to find rowEntity in grid data, dirty flag cannot be set');
      return;
    }
    if (newValue !== previousValue || gridRow.isDirty) {

      if (!gridRow.isDirty) {
        gridRow.isDirty = true;
        this.dirtyRows.push(gridRow);
      }
      delete gridRow.isError;
      this.considerSetTimer(grid, gridRow);
    }
  };

  /**
   * @ngdoc method
   * @methodOf table.factories:RowAutoSaveFactory
   * @name considerSetTimer
   * @description Consider setting a timer on this row (if it is dirty).  if there is a timer running
   * on the row and the row isn't currently saving, cancel it, using cancelTimer, then if the row is
   * dirty and not currently saving then set a new timer
   * @param {object} grid the grid for which we are processing
   * @param {GridRow} gridRow the row for which the timer should be adjusted
   *
   */
  private considerSetTimer = (grid: TableComponent, gridRow: any): void => {
    this.cancelTimer(grid, gridRow);
    if (gridRow.isDirty && !gridRow.isSaving) {
      let waitTime = 2000;
      gridRow.rowEditSaveTimer = setInterval(this.saveRow(grid, gridRow));
    }
  };

  /**
   * @ngdoc method
   * @methodOf table.factories:RowAutoSaveFactory
   * @name cancelTimer
   * @description cancel the $interval for any timer running on this row
   * then delete the timer itself
   * @param {object} grid the grid for which we are processing
   * @param {GridRow} gridRow the row for which the timer should be adjusted
   *
   */
  private cancelTimer = (grid: TableComponent, gridRow: any): void => {
    if (gridRow && gridRow.rowEditSaveTimer && !gridRow.isSaving) {
      clearInterval(gridRow.rowEditSaveTimer);
      delete gridRow.rowEnditSaveTimer;
    }
  };

  public getDirtyRows = (): Array<any> => {
    return this.dirtyRows ? this.dirtyRows : [];
  };

  public getErrorRows = (): Array<any> => {
    return this.errorRows ? this.errorRows : [];
  };

  public flushDirtyRows = (): any => {
    return true;
  };

  public setRowsDirty = (rows: any): void => {

  };

  public setRowsClean = (rows: any): void => {

  };

  private onCellEditingStarted = ($event: any): void => {
    //console.debug(this.debugStr + 'onCellEditingStarted', $event);
    this.beginCellEdit($event.node, $event.colDef);
  };

  private onCellEditingStopped = ($event: any): void => {
    //console.debug(this.debugStr + 'onCellEditingStopped', $event);
  };

  private onCellFocused = ($event: any): void => {
    //console.debug(this.debugStr + 'onCellFocused', $event);
  };

  private onCellValueChanged = ($event: any): void => {
    //console.debug('onCellValueChanged: ' + $event.oldValue + ' to ' + $event.newValue);
    this.endCellEdit($event.node, $event.colDef, $event.newValue, $event.oldValue);
  };

  private onSelectionChanged = ($event: any): void => {
    //console.debug(this.debugStr + 'onSelectionChanged', $event);
  };

  private onRowSelected = ($event: any): void => {
    //console.debug(this.debugStr + 'onRowSelected', $event);
  };

}
