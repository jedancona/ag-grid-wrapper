/* tslint:disable */
import {
  Component,
  ViewEncapsulation,
  AfterViewInit,
  ViewContainerRef,
  ElementRef,
  OnDestroy
} from "@angular/core";
import {ComponentUtil} from "ag-grid/main";
import {Ng2FrameworkFactory} from "ag-grid-ng2";

import * as _ from "lodash";

import {TableBaseComponent} from "./table-base";
import {TableRowFactory} from "./row/row.factory";

@Component({
  moduleId: module.id,
  selector: 'ui-table',
  templateUrl: './table.component.tpl.html',
  styleUrls: ['table.component.css'],
  // tell angular we don't want view encapsulation, we don't want a shadow root
  encapsulation: ViewEncapsulation.None
})

export class TableComponent extends TableBaseComponent implements OnDestroy, AfterViewInit {

  constructor(elementDef: ElementRef,
              viewContainerRef: ViewContainerRef,
              ng2FrameworkFactory: Ng2FrameworkFactory,
              private tableRowFactory: TableRowFactory) {

    super(elementDef, viewContainerRef, ng2FrameworkFactory);
    this.table = this;
  }

  ngAfterViewInit(): any {
    this.gridOptions = ComponentUtil.copyAttributesToGridOptions(this.gridOptions, this);
    this.tableRowFactory.registerTableRowFeatures(this._onApiRegistered, this);
    this.setGridParams(this);
    this.setColumns();
    this.setDefaults();
    this.tableRowFactory.registerRowComponents(this);
    // This must be done after the row components are set
    this.tableRowFactory.setFloatingRowColumnRenderer(this);
    this.initializeGrid(this);
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

  public ngOnChanges(changes: any): void {
    if (this._initialized) {
      ComponentUtil.processOnChange(changes, this.gridOptions, this.api, this.columnApi);
    }
  }

  public ngOnDestroy(): void {
    if (this._initialized) {
      // need to do this before the destroy, so we know not to emit any events
      // while tearing down the grid.
      this.tableRowFactory.unRegisterTableRowFeatures(this);
      if (this.resizerTimeout) {
        clearTimeout(this.resizerTimeout);
      }
      this.api.removeEventListener('columnResized', this.onResize);
      this._destroyed = true;
      this.api.destroy();
    }
  }


}
