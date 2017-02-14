/* tslint:disable */
import {
  ViewContainerRef,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  HostListener, ContentChildren, QueryList
} from "@angular/core";
import {Grid, GridOptions, GridApi, ColumnApi, GridParams, ComponentUtil, ColDef} from "ag-grid/main";
import {Ng2FrameworkFactory} from "ag-grid-ng2";
import {TableColumnComponent} from "./column/column";

import * as _ from "lodash";
import {Subject} from "rxjs";

import {TableComponent} from "./table.component";
import {TableRowFactory} from "./row/row.factory";

export class TableBaseComponent {

  protected _nativeElement: any;
  protected _initialized: boolean = false;
  protected _destroyed: boolean = false;
  protected _onApiRegistered: Subject<any> = new Subject();
  protected resizerTimeout: any = null;
  protected gridParams: GridParams;
  protected colDefs: any = [];
  protected ng2FrameworkFactory: any;
  private _table: TableComponent;

  // making these public, so they are accessible to people using the ng2 component references
  public api: GridApi;
  public columnApi: ColumnApi;


  @ContentChildren(TableColumnComponent) public columns: QueryList<TableColumnComponent>;

  constructor(elementDef: ElementRef,
              viewContainerRef: ViewContainerRef,
              ng2FrameworkFactory: Ng2FrameworkFactory) {
    this._nativeElement = elementDef.nativeElement;
    this.createComponentEvents();
    this.ng2FrameworkFactory = ng2FrameworkFactory;
    ng2FrameworkFactory.setViewContainerRef(viewContainerRef);
  }

  public set table(table: TableComponent) {
    this._table = table;
  }

  protected setGridParams = (table: TableComponent) => {
    table.gridParams = {
      globalEventListener: this.globalEventListener.bind(table),
      frameworkFactory: this.ng2FrameworkFactory
    };
  };

  protected initializeGrid = (table: TableComponent): void => {
    new Grid(table._nativeElement.getElementsByClassName('ui-table')[0], table.gridOptions, table.gridParams);

    if (table.gridOptions.api) {
      table.api = table.gridOptions.api;
      table.api.sizeColumnsToFit();
    }


    if (table.gridOptions.columnApi) {
      table.columnApi = table.gridOptions.columnApi;
    }

    table._onApiRegistered.next(this);
    table.api.addEventListener('columnResized', this.onResize);

    table._initialized = true;
  };

  protected addColumn = (colDef: TableColumnComponent) => {
    this.colDefs.push(colDef as ColDef);
  };

  protected setColumns = (): void => {
    let self = this;
    if (this.columns && this.columns.length > 0) {
      this.gridOptions.columnDefs = this.columns
        .map((column: TableColumnComponent) => {
          return column.toColDef();
        });
    }
    if (this.colDefs && this.colDefs.length > 0) {
      this.gridOptions.columnDefs = this.colDefs;
    }

  };

  @HostListener('window:resize', ['$event'])
  protected onResize = (event: any): void => {
    if (this.api && this.api.sizeColumnsToFit && !this.resizerTimeout) {
      this.resizerTimeout = setTimeout((): void => {
        this.api.sizeColumnsToFit();
        this.resizerTimeout = null;
      }, 1000);
    }
  };

  private globalEventListener(eventType: string, event: any): void {
    // if we are tearing down, don't emit angular 2 events, as this causes
    // problems with the angular 2 router
    if (this._destroyed) {
      return;
    }
    // generically look up the eventType
    let emitter = <EventEmitter<any>> (<any>this)[eventType];
    if (emitter) {
      emitter.emit(event);
    } else {
      console.log('ag-Grid-ng2: could not find EventEmitter: ' + eventType);
    }
  };


  protected createComponentEvents = (): void => {
    ComponentUtil.EVENTS.forEach((eventName) => {
      (<any>this)[eventName] = new EventEmitter();
    });
  };

  @Input() public suppressKeepFocus: boolean = false;
  @Input() public gridOptions: GridOptions;
  @Input() public slaveGrids: any = undefined;
  @Input('data') public rowData: any = undefined;
  @Input() public showSingleSelect: boolean = undefined;
  @Input() public showMultiSelect: boolean = undefined;
  @Input() public showFooter: boolean = false;
  @Input() public actionMenu: boolean = undefined;
  @Input() public enableRowAutoSave: boolean = true;
  @Input() public enableRowModifiedFields: boolean = true;
  @Input() public floatingTopRowData: any = undefined;
  @Input() public floatingBottomRowData: any = undefined;
  @Input() public columnDefs: any = undefined;
  @Input() public defaultColDef: any = undefined;
  @Input() public rowStyle: any = undefined;
  @Input() public context: any = undefined;
  @Input() public groupColumnDef: any = undefined;
  @Input() public localeText: any = undefined;
  @Input() public icons: any = undefined;
  @Input() public datasource: any = undefined;
  @Input() public viewportDatasource: any = undefined;
  @Input() public groupRowRendererParams: any = undefined;
  @Input() public aggFuncs: any = undefined;
  @Input() public fullWidthCellRendererParams: any = undefined;
  @Input() public sortingOrder: any = undefined;
  @Input() public rowClass: any = undefined;
  @Input() public rowSelection: any = undefined;
  @Input() public overlayLoadingTemplate: any = undefined;
  @Input() public overlayNoRowsTemplate: any = undefined;
  @Input() public headerCellTemplate: any = undefined;
  @Input() public quickFilterText: any = undefined;
  @Input() public rowModelType: any = undefined;
  @Input() public rowHeight: any = undefined;
  @Input() public rowBuffer: any = undefined;
  @Input() public colWidth: any = undefined;
  @Input() public headerHeight: any = 40;
  @Input() public groupDefaultExpanded: any = undefined;
  @Input() public minColWidth: any = undefined;
  @Input() public maxColWidth: any = undefined;
  @Input() public viewportRowModelPageSize: any = undefined;
  @Input() public viewportRowModelBufferSize: any = undefined;
  @Input() public layoutInterval: any = undefined;
  @Input() public autoSizePadding: any = undefined;
  @Input() public maxPagesInCache: any = undefined;
  @Input() public maxConcurrentDatasourceRequests: any = undefined;
  @Input() public paginationOverflowSize: any = undefined;
  @Input() public paginationPageSize: any = undefined;
  @Input() public paginationInitialRowCount: any = undefined;
  @Input() public headerCellRenderer: any = undefined;
  @Input() public localeTextFunc: any = undefined;
  @Input() public groupRowInnerRenderer: any = undefined;
  @Input() public groupRowRenderer: any = undefined;
  @Input() public isScrollLag: any = undefined;
  @Input() public isExternalFilterPresent: any = undefined;
  @Input() public getRowHeight: any = undefined;
  @Input() public doesExternalFilterPass: any = undefined;
  @Input() public getRowClass: any = undefined;
  @Input() public getRowStyle: any = undefined;
  @Input() public getHeaderCellTemplate: any = undefined;
  @Input() public traverseNode: any = undefined;
  @Input() public getContextMenuItems: any = undefined;
  @Input() public getMainMenuItems: any = undefined;
  @Input() public processRowPostCreate: any = undefined;
  @Input() public processCellForClipboard: any = undefined;
  @Input() public getNodeChildDetails: any = undefined;
  @Input() public groupRowAggNodes: any = undefined;
  @Input() public getRowNodeId: any = undefined;
  @Input() public isFullWidthCell: any = undefined;
  @Input() public fullWidthCellRenderer: any = undefined;
  @Input() public doesDataFlower: any = undefined;
  @Input() public toolPanelSuppressRowGroups: any = undefined;
  @Input() public toolPanelSuppressValues: any = undefined;
  @Input() public toolPanelSuppressPivots: any = undefined;
  @Input() public toolPanelSuppressPivotMode: any = undefined;
  @Input() public suppressRowClickSelection: any = undefined;
  @Input() public suppressCellSelection: any = undefined;
  @Input() public suppressHorizontalScroll: any = undefined;
  @Input() public debug: any = undefined;
  @Input() public enableColResize: any = undefined;
  @Input() public enableCellExpressions: any = undefined;
  @Input() public enableSorting: any = true;
  @Input() public enableServerSideSorting: any = undefined;
  @Input() public enableFilter: any = undefined;
  @Input() public enableServerSideFilter: any = undefined;
  @Input() public angularCompileRows: any = undefined;
  @Input() public angularCompileFilters: any = undefined;
  @Input() public angularCompileHeaders: any = undefined;
  @Input() public groupSuppressAutoColumn: any = undefined;
  @Input() public groupSelectsChildren: any = undefined;
  @Input() public groupIncludeFooter: any = undefined;
  @Input() public groupUseEntireRow: any = undefined;
  @Input() public groupSuppressRow: any = undefined;
  @Input() public groupSuppressBlankHeader: any = undefined;
  @Input() public forPrint: any = undefined;
  @Input() public suppressMenuHide: any = undefined;
  @Input() public rowDeselection: any = undefined;
  @Input() public unSortIcon: any = undefined;
  @Input() public suppressMultiSort: any = undefined;
  @Input() public suppressScrollLag: any = undefined;
  @Input() public singleClickEdit: any = undefined;
  @Input() public suppressLoadingOverlay: any = undefined;
  @Input() public suppressNoRowsOverlay: any = undefined;
  @Input() public suppressAutoSize: any = undefined;
  @Input() public suppressParentsInRowNodes: any = undefined;
  @Input() public showToolPanel: any = undefined;
  @Input() public suppressColumnMoveAnimation: any = undefined;
  @Input() public suppressMovableColumns: any = undefined;
  @Input() public suppressFieldDotNotation: any = undefined;
  @Input() public enableRangeSelection: any = undefined;
  @Input() public suppressEnterprise: any = undefined;
  @Input() public rowGroupPanelShow: any = undefined;
  @Input() public pivotPanelShow: any = undefined;
  @Input() public suppressContextMenu: any = undefined;
  @Input() public suppressMenuFilterPanel: any = undefined;
  @Input() public suppressMenuMainPanel: any = undefined;
  @Input() public suppressMenuColumnPanel: any = undefined;
  @Input() public enableStatusBar: any = undefined;
  @Input() public rememberGroupStateWhenNewData: any = undefined;
  @Input() public enableCellChangeFlash: any = undefined;
  @Input() public suppressDragLeaveHidesColumns: any = undefined;
  @Input() public suppressMiddleClickScrolls: any = undefined;
  @Input() public suppressPreventDefaultOnMouseWheel: any = undefined;
  @Input() public suppressUseColIdForGroups: any = undefined;
  @Input() public suppressCopyRowsToClipboard: any = undefined;
  @Input() public pivotMode: any = undefined;
  @Input() public suppressAggFuncInHeader: any = undefined;
  @Input() public suppressColumnVirtualisation: any = undefined;
  @Input() public suppressFocusAfterRefresh: any = undefined;
  @Input() public functionsPassive: any = undefined;
  @Input() public functionsReadOnly: any = undefined;
  @Input() public defaultColGroupDef: any = undefined;
  @Input() public editType: any = undefined;
  @Input() public scrollbarWidth: any = undefined;
  @Input() public groupRowInnerRendererFramework: any = undefined;
  @Input() public groupRowRendererFramework: any = undefined;
  @Input() public fullWidthCellRendererFramework: any = undefined;
  @Input() public processSecondaryColDef: any = undefined;
  @Input() public processSecondaryColGroupDef: any = undefined;
  @Input() public suppressRowHoverClass: any = undefined;
  @Input() public suppressTouch: any = undefined;
  @Input() public animateRows: any = undefined;
  @Input() public groupSelectsFiltered: any = undefined;
  @Input() public groupRemoveSingleChildren: any = undefined;
  @Input() public getBusinessKeyForNode: any = undefined;
  @Input() public checkboxSelection: any = undefined;
  @Input() public enableRtl: any = undefined;
  @Input() public suppressClickEdit: any = undefined;
  @Input() public enableRtlSupport: any = undefined;
  @Input() public excelStyles: any = undefined;
  @Input() public dateComponent: any = undefined;
  @Input() public sendToClipboard: any = undefined;
  @Input() public navigateToNextCell: any = undefined;
  @Input() public tabToNextCell: any = undefined;
  @Input() public processCellFromClipboard: any = undefined;
  @Input() public getDocument: any = undefined;
  @Input() public enableGroupEdit: any = undefined;
  @Input() public embedFullWidthRows: any = undefined;

  /**
   * Outputs
   */
  @Input() public onSaveRow: Promise<any>;
  @Output() public gridReady: EventEmitter<any>;
  @Output() public columnEverythingChanged: EventEmitter<any>;
  @Output() public newColumnsLoaded: EventEmitter<any>;
  @Output() public columnPivotModeChanged: EventEmitter<any>;
  @Output() public columnRowGroupChanged: EventEmitter<any>;
  @Output() public columnPivotChanged: EventEmitter<any>;
  @Output() public gridColumnsChanged: EventEmitter<any>;
  @Output() public columnValueChanged: EventEmitter<any>;
  @Output() public columnMoved: EventEmitter<any>;
  @Output() public columnVisible: EventEmitter<any>;
  @Output() public columnPinned: EventEmitter<any>;
  @Output() public columnGroupOpened: EventEmitter<any>;
  @Output() public columnResized: EventEmitter<any>;
  @Output() public displayedColumnsChanged: EventEmitter<any>;
  @Output() public virtualColumnsChanged: EventEmitter<any>;
  @Output() public rowGroupOpened: EventEmitter<any>;
  @Output() public rowDataChanged: EventEmitter<any>;
  @Output() public floatingRowDataChanged: EventEmitter<any>;
  @Output() public rangeSelectionChanged: EventEmitter<any>;
  @Output() public columnRowGroupAddRequest: EventEmitter<any>;
  @Output() public columnRowGroupRemoveRequest: EventEmitter<any>;
  @Output() public columnPivotAddRequest: EventEmitter<any>;
  @Output() public columnPivotRemoveRequest: EventEmitter<any>;
  @Output() public columnValueAddRequest: EventEmitter<any>;
  @Output() public columnValueRemoveRequest: EventEmitter<any>;
  @Output() public columnAggFuncChangeRequest: EventEmitter<any>;
  @Output() public clipboardPaste: EventEmitter<any>;
  @Output() public modelUpdated: EventEmitter<any>;
  @Output() public cellClicked: EventEmitter<any>;
  @Output() public cellDoubleClicked: EventEmitter<any>;
  @Output() public cellContextMenu: EventEmitter<any>;
  @Output() public cellValueChanged: EventEmitter<any>;
  @Output() public cellFocused: EventEmitter<any>;
  @Output() public rowSelected: EventEmitter<any>;
  @Output() public selectionChanged: EventEmitter<any>;
  @Output() public beforeFilterChanged: EventEmitter<any>;
  @Output() public filterChanged: EventEmitter<any>;
  @Output() public afterFilterChanged: EventEmitter<any>;
  @Output() public filterModified: EventEmitter<any>;
  @Output() public beforeSortChanged: EventEmitter<any>;
  @Output() public sortChanged: EventEmitter<any>;
  @Output() public afterSortChanged: EventEmitter<any>;
  @Output() public virtualRowRemoved: EventEmitter<any>;
  @Output() public rowClicked: EventEmitter<any>;
  @Output() public rowDoubleClicked: EventEmitter<any>;
  @Output() public gridSizeChanged: EventEmitter<any>;
  @Output() public viewportChanged: EventEmitter<any>;
  @Output() public dragStarted: EventEmitter<any>;
  @Output() public dragStopped: EventEmitter<any>;
  @Output() public itemsAdded: EventEmitter<any>;
  @Output() public itemsRemoved: EventEmitter<any>;
  @Output() public columnRowGroupChangeRequest: EventEmitter<any>;
  @Output() public columnPivotChangeRequest: EventEmitter<any>;
  @Output() public columnValueChangeRequest: EventEmitter<any>;
  @Output() public rowValueChanged: EventEmitter<any>;
  @Output() public bodyScroll: EventEmitter<any>;
  @Output() public rowEditingStarted: EventEmitter<any>;
  @Output() public rowEditingStopped: EventEmitter<any>;
  @Output() public cellEditingStarted: EventEmitter<any>;
  @Output() public cellEditingStopped: EventEmitter<any>;
  @Output() public displayedColumnsWidthChanged: EventEmitter<any>;
  @Output() public scrollVisibilityChanged: EventEmitter<any>;
  @Output() public flashCells: EventEmitter<any>;

  //Custom
  @Output() public selectedRows = new EventEmitter<any>();
}
