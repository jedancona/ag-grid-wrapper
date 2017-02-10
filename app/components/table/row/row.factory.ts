/* tslint:disable */
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {TableComponent} from "../table.component";
import {RowAutoSaveFactory} from "./row-auto-save.factory";
import {RowFooterAggregationFactory} from "./row-footer-aggregation.factory";
import {RowModifiedFieldsFactory} from "./row-modified-fields.factory";
import {RowSingleSelectComponent} from "./row-single-select.component";
import {RowActionMenuComponent} from "./row-action-menu.component";
import {RowAddFactory} from "./row-add.factory";

@Injectable()
export class TableRowFactory {

  constructor(private rowAddFactory: RowAddFactory,
    private rowAutoSaveFactory: RowAutoSaveFactory,
              private rowFooterAggregationFactory: RowFooterAggregationFactory,
              private rowModifiedFieldsFactory: RowModifiedFieldsFactory) {
  }

  public registerTableRowFeatures = (onGridApiRegistered: Subject<any>, table: TableComponent): void => {
    onGridApiRegistered.subscribe(this._onGridApiRegistered);
    this.setGridRowStyle(table);
    this.setTableRowHeight(table);
  };

  public unRegisterTableRowFeatures = (table: TableComponent): void => {
    this.rowAddFactory.unRegisterGridListener(table);

    if (table.enableRowAutoSave) {
      this.rowAutoSaveFactory.unRegisterGridListener(table);
    }

    if (table.showFooter) {
      this.rowFooterAggregationFactory.unRegisterGridListener(table);
    }

    if (table.enableRowModifiedFields) {
      this.rowModifiedFieldsFactory.unRegisterGridListener(table);
    }

  };

  private _onGridApiRegistered = (table: TableComponent): void => {
    this.rowAddFactory.onGridApiRegistered(table);

    if (table.enableRowAutoSave) {
      this.rowAutoSaveFactory.onGridApiRegistered(table);
    }

    if (table.showFooter) {
      this.rowFooterAggregationFactory.onGridApiRegistered(table);
    }

    if (table.enableRowModifiedFields) {
      this.rowModifiedFieldsFactory.onGridApiRegistered(table);
    }

  };

  public setTableRowHeight = (table: TableComponent) => {
    table.gridOptions.getRowHeight = (params: any): any => {
      if (params && params.node) {
        if (params.node.floating) {
          return 40;
        }
        else {
          return 30;
        }

      }
    };
  };

  public setGridRowStyle = (table: TableComponent): void => {
    table.gridOptions.getRowStyle = (params: any): any => {
      if (params && params.node) {
        if (params.node.isSaving) {
          return {'color': '#ccc'};
        } else if (params.node.isError) {
          return {'color': 'red'};
        } else if (params.node.isDirty) {
          return {'backgroud-color': 'blue'};
        }
      } else {
        return null;
      }
    };
  };

  public registerRowComponents = (table: TableComponent): void => {
    this.setSingleSelect(table);
    this.setMultiSelect(table);
    this.setActionMenu(table);
  };

  public setFloatingRowColumnRenderer = (table: TableComponent): void => {
    if (table.showFooter) {
      console.debug('set floating row');
      table.gridOptions.columnDefs.forEach((column: any) =>{
        column.floatingCellRenderer = (params: any): any => {
          if (params.colDef.aggregationType && params.node.floating) {
            return '<div class="footer-cell" ><div class="footer-cell-title" >' + params.value + '</div></div>';
          }
          return '';
        };
      });
    }
  };

  private setSingleSelect = (table: TableComponent): void => {
    if (table.showSingleSelect) {
      let singleSelectCell = {
        headerName: '',
        field: 'singleSelect',
        cellRendererFramework: RowSingleSelectComponent,
        width: 30,
        minWidth: 30,
        maxWidth: 30,
        cellClass: 'ag-grid-single-select-cell',
      };
      table.gridOptions.rowSelection = 'single';
      table.gridOptions.columnDefs.unshift(singleSelectCell);
    }
  };

  private setMultiSelect = (table: TableComponent): void => {
    if (table.showMultiSelect) {
      let multiSelectCell = {
        headerName: '',
        field: 'multiSelect',
        width: 30,
        minWidth: 30,
        maxWidth: 30,
        checkboxSelection: true,
        cellClass: 'ag-grid-multi-select-cell',
      };
      table.gridOptions.rowSelection = 'multiple';
      table.gridOptions.columnDefs.unshift(multiSelectCell);
    }
  };

  private setActionMenu = (table: TableComponent): void => {
    if (table.actionMenu) {
      let actionMenuCell = {
        headerName: '',
        field: 'actionMenu"',
        data: table.actionMenu,
        cellRendererFramework: RowActionMenuComponent,
        width: 30,
        minWidth: 30,
        maxWidth: 30,
        cellClass: 'ag-grid-action-menu-cell',
      };
      table.gridOptions.columnDefs.push(actionMenuCell);
    }
  };




}