import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import * as _ from "lodash";
import {TableComponent} from "../../table";

@Injectable()
export class RowAutoSaveFactory {

  constructor() {
  }

  public registerGridListener = (onGridApiRegistered: Subject<any>): void => {
    onGridApiRegistered.subscribe(this._onGridApiRegistered)
  };

  public unRegisterGridListener = (table: TableComponent): void => {
    table.cellEditingStarted.unsubscribe();
    table.cellEditingStopped.unsubscribe();
    table.cellValueChanged.unsubscribe();
    table.bodyScroll.unsubscribe();
    this.destroyPublicApi(table.api);
  };

  private _onGridApiRegistered = (table: TableComponent): void => {

    this.setupPublicApi(table.api);
    this.setGridSavePromise(table.api, table.onSaveRow);
    table.cellEditingStarted.subscribe(this.onCellEditingStarted);
    table.cellEditingStopped.subscribe(this.onCellEditingStopped);
    table.cellValueChanged.subscribe(this.onCellValueChanged);
    // we bind to the grid so we have context in order to
    // stop editing if the user begins scrolling the grid.
    // otherwise an error is thrown when the virtualized
    // row is destroyed.  Would like to do this another
    // way or possibly disable the scrolling while in edit mode.
    table.bodyScroll.subscribe(this.onBodyScroll(table));
  };



  private setupPublicApi = (grid: any): void => {
    _.defaultsDeep(grid, {
      rowEdit: {
        setSavePromise: this.setSavePromise,
        getDirtyRows: this.getDirtyRows,
        getErrorRows: this.getErrorRows,
        flushDirtyRows: this.flushDirtyRows,
        setRowsDirty: this.setRowsDirty,
        setRowsClean: this.setRowsClean,
        dirtyRows: [],
        errorRows: [],

      }
    })
  };

  private destroyPublicApi = (grid: any): void => {
    _.defaultsDeep(grid,{
      rowEdit: {
        setSavePromise: null,
        getDirtyRows: null,
        getErrorRows: null,
        flushDirtyRows: null,
        setRowsDirty: null,
        setRowsClean: null,
        dirtyRows: null,
        errorRows: null,
      }
    });
    delete grid.rowEdit;
  };

  private setGridSavePromise = (grid: any, savePromise: Promise<any>) => {
    grid.rowEdit.savePromise = savePromise;
  };

  private onBodyScroll (table: TableComponent): any  {

    return ($event?: any): void => {
      setTimeout((): void => {table.api.stopEditing()});
    };

  };

  private onCellEditingStarted = ($event: any): void => {
    //console.debug('onCellEditingStarted', $event);
    this.beginCellEdit($event.api, $event.node, $event.colDef);
  };

  private onCellEditingStopped = ($event: any): void => {
    //this.endCellEdit($event.api, $event.node, $event.colDef, $event.newValue, $event.oldValue);
  };

  private onCellValueChanged = ($event: any): void => {
    // fires on cell editing stopped regardless of whether value changed.
    //console.debug('onCellValueChanged: ' + $event.oldValue + ' to ' + $event.newValue);
    this.endCellEdit($event.api, $event.node, $event.colDef, $event.newValue, $event.oldValue);
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
  private saveRow = (grid: any, gridRow: any): any => {
    let self = this;

    return (): Promise<any> => {
      if (gridRow.rowEditSavePromise) {
        return gridRow.rowEditSavePromise;
      }
      gridRow.isSaving = true;
      grid.refreshRows([gridRow]);
      let promise: Promise<any> = grid.rowEdit.savePromise(gridRow.data);
      this.setSavePromise(gridRow, promise);

      if (promise) {
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
  private processSuccessPromise = (grid: any, gridRow: any): any => {
    return (): any => {
      delete gridRow.isSaving;
      this.cancelTimer(grid, gridRow);
      delete gridRow.isDirty;
      delete gridRow.isError;
      delete gridRow.rowEditSaveTimer;
      delete gridRow.rowEditSavePromise;
      grid.refreshRows([gridRow]);
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
      this.cancelTimer(grid, gridRow);
      delete gridRow.rowEditSaveTimer;
      delete gridRow.rowEditSavePromise;
      gridRow.isError = true;
      if (!grid.rowEdit.errorRows) {
        grid.rowEdit.errorRows = [];
      }
      grid.rowEdit.errorRows.push(gridRow);
      grid.refreshRows([gridRow]);
      this.removeRow(grid.rowEdit.errorRows, gridRow);
      this.removeRow(grid.rowEdit.dirtyRows, gridRow);
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
  private beginCellEdit = (grid: any, gridRow: any, colDef?: any): void => {
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
  private endCellEdit = (grid: any, gridRow: any, colDef: any, newValue: any, previousValue: any): void => {

    if (!gridRow) {
      console.debug('Unable to find rowEntity in grid data, dirty flag cannot be set');
      return;
    }
    if (newValue !== previousValue || gridRow.isDirty) {

      if (!gridRow.isDirty) {
        gridRow.isDirty = true;
        grid.rowEdit.dirtyRows.push(gridRow);
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
  private considerSetTimer = (grid: any, gridRow: any): void => {
    this.cancelTimer(grid, gridRow);
    if (gridRow.isDirty && !gridRow.isSaving) {
      let waitTime = 2000;
      gridRow.rowEditSaveTimer = setInterval(this.saveRow(grid, gridRow), waitTime);
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
  private cancelTimer = (grid: any, gridRow: any): void => {
    if (gridRow && gridRow.rowEditSaveTimer && !gridRow.isSaving) {
      clearInterval(gridRow.rowEditSaveTimer);
      delete gridRow.rowEnditSaveTimer;
    }
  };

  /**
   * @ngdoc method
   * @methodOf table.factories:RowAutoSaveFactory
   * @name getDirtyRows
   * @description Returns all currently dirty rows
   * <pre>
   *      gridApi.rowEdit.getDirtyRows(grid)
   * </pre>
   * @returns {array} An array of gridRows that are currently dirty
   *
   */
  public getDirtyRows = (grid: any): Array<any> => {
    return grid.rowEdit.dirtyRows ? grid.rowEdit.dirtyRows : [];
  };

  /**
   * @ngdoc method
   * @methodOf table.factories:RowAutoSaveFactory
   * @name getErrorRows
   * @description Returns all currently errored rows
   * <pre>
   *      gridApi.rowEdit.getErrorRows(grid)
   * </pre>
   * @returns {array} An array of gridRows that are currently in error
   *
   */
  public getErrorRows = (grid: any): Array<any> => {
    return grid.rowEdit.errorRows ? grid.rowEdit.errorRows : [];
  };

  /**
   * @ngdoc method
   * @methodOf table.factories:RowAutoSaveFactory
   * @name flushDirtyRows
   * @description Triggers a save event for all currently dirty rows, could
   * be used where user presses a save button or navigates away from the page
   * @param {object} grid the grid for which dirty rows should be flushed
   * @returns {promise} a promise that represents the aggregate of all
   * of the individual save promises - i.e. it will be resolved when all
   * the individual save promises have been resolved.
   *
   */
  public flushDirtyRows = (grid: any): Promise<any> => {
    let self = this;
    let promises = [] as Array<Promise<any>>;
    grid.rowEdit.getDirtyRows().forEach((gridRow: any): void => {
      self.saveRow(grid, gridRow)();
      promises.push(gridRow.rowEditSavePromise);
    });
    return Promise.all(promises);
  };

  /**
   * @ngdoc method
   * @methodOf table.factories:RowAutoSaveFactory
   * @name setRowsDirty
   * @description Sets each of the rows passed in dataRows
   * to be dirty.
   * @param {object} grid the grid for which rows should be set dirty
   * @param {array} rowArray the nodes for which the gridRows
   * should be set dirty.
   *
   */
  public setRowsDirty = (grid: any, rowArray: Array<any>): void => {
    rowArray.forEach((gridRow: any, index: number): void => {
      if (gridRow) {
        if (!grid.rowEdit.dirtyRows) {
          grid.rowEdit.dirtyRows = [];
        }
        if (!gridRow.isDirty) {
          gridRow.isDirty = true;
          grid.rowEdit.dirtyRows.push(gridRow);
        }
        delete gridRow.isError;
        this.considerSetTimer(grid, gridRow);
      } else {
        console.debug("requested row not found in rowEdit.setRowsDirty, row was: " + gridRow);
      }
    });
  };

  /**
   * @ngdoc method
   * @methodOf table.factories:RowAutoSaveFactory
   * @name setRowsClean
   * @description Sets each of the rows passed in dataRows
   * to be clean, clearing the dirty flag and the error flag, and removing
   * the rows from the dirty and error caches.
   * @param {object} grid the grid for which rows should be set clean
   * @param {array} rowArray the row nodes for which the gridRows
   * should be set clean.
   *
   */
  public setRowsClean = (grid: any, rowArray: Array<any>): void => {
    rowArray.forEach((gridRow: any, index: number): void => {
      if (gridRow) {
        delete gridRow.isDirty;
        this.removeRow(grid.rowEdit.dirtyRows, gridRow);
        this.cancelTimer(grid, gridRow);
        delete gridRow.isError;
        this.removeRow(grid.rowEdit.errorRows, gridRow);
      } else {
        console.debug("requested row not found in rowEdit.setRowsClean, row was: " + gridRow);
      }
    });
  };

}
