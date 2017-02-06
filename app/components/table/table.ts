import {
  Component,
  ViewEncapsulation,
  AfterViewInit,
  ViewContainerRef,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  HostListener,
  OnDestroy, ContentChildren, QueryList
} from "@angular/core";
import {Grid, GridOptions, GridApi, ColumnApi, GridParams, ComponentUtil, ColDef} from "ag-grid/main";
import {Ng2FrameworkFactory} from "ag-grid-ng2";
import {TableColumnComponent} from "./column/column";
import {RowSingleSelectComponent} from "./row-single-select/row-single-select";
import {RowActionMenuComponent} from "./row-action-menu/row-action-menu";
import * as _ from "lodash";
import {Subject} from "rxjs";
import {RowAutoSaveFactory} from "./factories/row-auto-save/row-auto-save";

@Component({
  selector: 'ui-table',
  templateUrl: 'app/components/table/table.tpl.html',
  styleUrls: ['app/components/table/table.css'],
  // tell angular we don't want view encapsulation, we don't want a shadow root
  encapsulation: ViewEncapsulation.None
})

export class TableComponent implements OnDestroy, AfterViewInit {

  private _nativeElement: any;
  private _initialized: boolean = false;
  private _destroyed: boolean = false;
  private _onApiRegistered: Subject<any> = new Subject();
  private resizerTimeout: any = null;

  private gridParams: GridParams;
  private gridFactoryExtendors: any;
  private colDefs: any = [];

  // making these public, so they are accessible to people using the ng2 component references
  public api: GridApi;
  public columnApi: ColumnApi;
  public onApiRegistered: any;

  @ContentChildren(TableColumnComponent) public columns: QueryList<TableColumnComponent>;

  constructor(elementDef: ElementRef,
              private viewContainerRef: ViewContainerRef,
              private ng2FrameworkFactory: Ng2FrameworkFactory,
              private rowAutoSaveFactory: RowAutoSaveFactory) {

    this._nativeElement = elementDef.nativeElement;
    // create all the events generically. this is done generically so that
    // if the list of grid events change, we don't need to change this code.
    this.createComponentEvents();

    this.ng2FrameworkFactory.setViewContainerRef(this.viewContainerRef);
    this.rowAutoSaveFactory.registerGridListener(this._onApiRegistered);
  }

  ngAfterViewInit(): any {
    this.gridOptions = ComponentUtil.copyAttributesToGridOptions(this.gridOptions, this);

    this.gridParams = {
      globalEventListener: this.globalEventListener.bind(this),
      frameworkFactory: this.ng2FrameworkFactory
    };

    this.gridOptions.getRowStyle = (params: any): any => {
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

    this.setColumns();
    this.setDefaults();
    this.setSingleSelect();
    this.setMultiSelect();
    this.setActionMenu();

    this.initializeGrid();
  };

  private initializeGrid = (): void => {


    new Grid(this._nativeElement.getElementsByClassName('ui-table')[0], this.gridOptions, this.gridParams);

    if (this.gridOptions.api) {
      this.api = this.gridOptions.api;
      this.api.sizeColumnsToFit();
    }

    if (this.gridOptions.columnApi) {
      this.columnApi = this.gridOptions.columnApi;
    }

    this._onApiRegistered.next(this);
    this.api.addEventListener('columnResized', this.onResize);

    this._initialized = true;
  };

  public addColumn = (colDef: TableColumnComponent) => {
    this.colDefs.push(colDef as ColDef);
  };

  private setColumns = (): void => {
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

  private setDefaults = (): void => {

    // TODO: Extract to a HeaderCellRenderer
    let headerCellTemplate = `<div class="ag-header-cell">
                                <div id="agResizeBar" class="ag-header-cell-resize"></div>
                                <span id="agMenu" class="ag-header-icon ag-header-cell-menu-button"></span>
                                <div id="agHeaderCellLabel" class="ag-header-cell-label">
                                    <div id="agText" class="ag-header-cell-text"></div>
                                  
                                    <div id="agNoSort" class="ag-header-icon ag-sort-none-icon"></div>
                                    <div id="agFilter" class="ag-header-icon ag-filter-icon"></div>                                    
                                </div>
                                <div id="agSortAsc" class="ag-header-icon ag-sort-ascending-icon"><i class="material-icons">arrow_drop_up</i></div>
                                <div id="agSortDesc" class="ag-header-icon ag-sort-descending-icon"><i class="material-icons">arrow_drop_down</i></div>
                            </div>`;

    _.defaults(this.gridOptions, {
      enableColResize: true,
      rowHeight: 30,
      rowDeselection: true,
      singleClickEdit: true,
      headerCellTemplate: headerCellTemplate
    });
  };

  @HostListener('window:resize', ['$event'])
  private onResize = (event: any): void => {
    if (this.api && this.api.sizeColumnsToFit && !this.resizerTimeout) {
      this.resizerTimeout = setTimeout((): void => {
        this.api.sizeColumnsToFit();
        this.resizerTimeout = null;
      }, 1000);
    }
  };

  private setSingleSelect = (): void => {
    if (this.showSingleSelect) {
      let singleSelectCell = {
        headerName: '',
        field: 'singleSelect',
        cellRendererFramework: RowSingleSelectComponent,
        width: 30,
        minWidth: 30,
        maxWidth: 30,
        cellClass: 'ag-grid-single-select-cell',
      };
      this.gridOptions.rowSelection = 'single';
      this.gridOptions.columnDefs.unshift(singleSelectCell);
    }
  };

  private setMultiSelect = (): void => {
    if (this.showMultiSelect) {
      let multiSelectCell = {
        headerName: '',
        field: 'multiSelect',
        width: 30,
        minWidth: 30,
        maxWidth: 30,
        checkboxSelection: true,
        cellClass: 'ag-grid-multi-select-cell',
      };
      this.gridOptions.rowSelection = 'multiple';
      this.gridOptions.columnDefs.unshift(multiSelectCell);
    }
  };

  private setActionMenu = (): void => {
    if (this.actionMenu) {
      let actionMenuCell = {
        headerName: '',
        field: 'actionMenu"',
        data: this.actionMenu,
        cellRendererFramework: RowActionMenuComponent,
        width: 30,
        minWidth: 30,
        maxWidth: 30,
        cellClass: 'ag-grid-action-menu-cell',
      };
      this.gridOptions.columnDefs.push(actionMenuCell);
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

  public ngOnChanges(changes: any): void {
    if (this._initialized) {
      ComponentUtil.processOnChange(changes, this.gridOptions, this.api, this.columnApi);
    }
  }

  public ngOnDestroy(): void {
    if (this._initialized) {
      // need to do this before the destroy, so we know not to emit any events
      // while tearing down the grid.
      if (this.resizerTimeout) {
        clearTimeout(this.resizerTimeout);
      }
      this._destroyed = true;
      this.api.removeEventListener('columnResized', this.onResize);
      this.rowAutoSaveFactory.unRegisterGridListener(this);
      this.api.destroy();
    }
  }

  private createComponentEvents = (): void => {
    ComponentUtil.EVENTS.forEach((eventName) => {
      (<any>this)[eventName] = new EventEmitter();
    });
  };

  private onRowSelected($event: any) {
    //console.log('onRowSelected: ' + $event.node.data.name);
  }

  private onModelUpdated() {
    //console.log('onModelUpdated');
  }

  private onReady() {
    //console.log('onReady');
  }

  private onCellClicked($event: any) {
    //console.log('onCellClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
  }

  private onCellValueChanged($event: any) {
    //console.log('onCellValueChanged: ' + $event.oldValue + ' to ' + $event.newValue);
  }

  private onCellDoubleClicked($event: any) {
    //console.log('onCellDoubleClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
  }

  private onCellContextMenu($event: any) {
    //console.log('onCellContextMenu: ' + $event.rowIndex + ' ' + $event.colDef.field);
  }

  private onCellFocused = ($event: any) => {
    //console.log(this.showMultiSelect + ' value of multiselect onCellFocused: (' + $event.rowIndex + ',' + $event.colIndex + ')');
  }

  private onRowClicked = ($event: any): void => {
    // console.log("hey row row changes", $event);
  }

  private onSelectionChanged = (): void => {
    // var selectedRows = this.gridOptions.api.getSelectedRows();
    // selectedRows.forEach(function (selectedRow: any, index: any) {
    //console.log(selectedRow + " and the index " + index);
    //  });
    //this.selectedRows.emit(selectedRows);
  }

  private onBeforeFilterChanged() {
    //console.log('beforeFilterChanged');
  }

  private onAfterFilterChanged() {
    //console.log('afterFilterChanged');
  }

  private onFilterModified() {
    //console.log('onFilterModified');
  }

  private onBeforeSortChanged() {
    //console.log('onBeforeSortChanged');
  }

  private onAfterSortChanged() {
    //console.log('onAfterSortChanged');
  }

  private onRowEditingStarted = ($event: any): void => {
  };


  @Input() public gridOptions: GridOptions;
  @Input() public slaveGrids: any = undefined;
  @Input('data') public rowData: any = undefined;
  @Input() public showSingleSelect: boolean = undefined;
  @Input() public showMultiSelect: boolean = undefined;
  @Input() public actionMenu: boolean = undefined;
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
