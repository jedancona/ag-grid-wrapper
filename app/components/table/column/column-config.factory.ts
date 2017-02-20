/* tslint:disable */
import { Injectable } from '@angular/core';

import * as _ from 'lodash';

import { TableColumnCheckboxRendererComponent } from './checkbox/checkbox-renderer.component';
import { TableColumnCheckboxEditorComponent } from './checkbox/checkbox-editor.component';

import { TableColumnDefaultEditorComponent } from './default/default-editor.component';
import { TableColumnDefaultRendererComponent } from './default/default-renderer.component';

import { TableColumnDateRendererComponent } from './date/date-renderer.component';

import { TableColumnLookupEditorComponent } from './lookup/lookup-editor.component';
import { TableColumnLookupRendererComponent } from './lookup/lookup-renderer.component';

import { TableColumnNumericEditorComponent } from './numeric/numeric-editor.component';

import { TableColumnSelectDropdownEditorComponent } from './select-dropdown/select-dropdown-editor.component';

import { TableColumnSlideToggleEditorComponent } from './slide-toggle/slide-toggle-editor.component';
import { TableColumnSlideToggleRendererComponent } from './slide-toggle/slide-toggle-renderer.component';

@Injectable()
export class TableColumnConfigFactory {

  constructor() {
  }

  public configureColumn = (column: any): void => {
    this.setColumnTypeEditor(column);
    this.setColumnCellFilter(column);
  };

  private setColumnTypeEditor = (column: any): void => {
    if (column.editable) {
      column.cellClass = 'editable';
      if (!column.type || column.type === 'text') {
        column.cellEditorFramework = TableColumnDefaultEditorComponent;
      }
      if (column.type === 'number') {
        column.cellEditorFramework = TableColumnNumericEditorComponent;
      }
      if (column.type === 'select') {
        column.cellEditorFramework = TableColumnSelectDropdownEditorComponent;
        column.cellClass = 'editable select-dropdown';
      }
      if (column.type === 'slide-toggle') {
        column.cellEditorFramework = TableColumnSlideToggleEditorComponent;
      }
      if (column.type === 'checkbox') {
        column.cellEditorFramework = TableColumnCheckboxEditorComponent;
      }
      if (column.type === 'lookup') {
        column.cellEditorFramework = TableColumnLookupEditorComponent;
        this.setLookupDefaults(column);
      }

    }
  };

  private setColumnCellFilter = (column: any): void => {
    if (column.type === 'date') {
      column.cellRendererFramework = TableColumnDateRendererComponent;
      if (column.cellFilter) {
        console.log('date with a filter', column.cellFilter);
      }
    }
    if (column.type === 'slide-toggle') {
      column.cellRendererFramework = TableColumnSlideToggleRendererComponent;
    }
    else if (column.type === 'checkbox') {
      column.cellRendererFramework = TableColumnCheckboxRendererComponent;
    }
    else if (column.type === 'lookup' && column.editable) {
      column.cellRendererFramework = TableColumnLookupRendererComponent;
    }
    else {
      column.cellRendererFramework = TableColumnDefaultRendererComponent;
    }
  };

  private setLookupDefaults = (column: any): void => {
    _.defaults(column, {
      lookupAction: 'key',
      lookupModalHeight: '80%',
      lookupModalWidth: '80%',
    })
  }

}
