/* tslint:disable */
import { Injectable } from '@angular/core';
import { DateCellRendererComponent } from './render/date-cell-renderer.component';
import { SlideToggleCellRendererComponent } from './render/slide-toggle-cell-renderer.component';
import { TableColumnEditTextComponent } from './editors/text-editor.component';
import { TableColumnEditorNumericComponent } from './editors/numeric-editor.component';
import { TableColumnEditSelectDropdownComponent } from './editors/select-editor.component';
import { TableColumnEditorSlideToggleComponent } from './editors/slide-toggle-editor.component';
import { DefaultCellRendererComponent } from './render/default-cell-renderer.component';
import { CheckboxCellRendererComponent } from './render/checkbox-cell-renderer.component';
import { TableColumnEditorCheckboxComponent } from './editors/checkbox-editor.component';
import { TableColumnLookupEditorComponent } from './lookup/lookup-editor.component';
import { TableColumnLookupRendererComponent } from './lookup/lookup-renderer.component';

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
        column.cellEditorFramework = TableColumnEditTextComponent;
      }
      if (column.type === 'number') {
        column.cellEditorFramework = TableColumnEditorNumericComponent;
      }
      if (column.type === 'select') {
        column.cellEditorFramework = TableColumnEditSelectDropdownComponent;
        column.cellClass = 'editable select-dropdown';
      }
      if (column.type === 'slide-toggle') {
        column.cellRendererFramework = SlideToggleCellRendererComponent;
        column.cellEditorFramework = TableColumnEditorSlideToggleComponent;
      }
      if (column.type === 'checkbox') {
        column.cellRendererFramework = CheckboxCellRendererComponent;
        column.cellEditorFramework = TableColumnEditorCheckboxComponent;
      }
      if (column.type === 'lookup') {
        column.cellEditorFramework = TableColumnLookupEditorComponent;
      }

    }
  };

  private setColumnCellFilter = (column: any): void => {
    if (column.type === 'date') {
      column.cellRendererFramework = DateCellRendererComponent;
      if (column.cellFilter) {
        console.log('date with a filter', column.cellFilter);
      }
    }
    if (column.type === 'slide-toggle') {
      column.cellRendererFramework = SlideToggleCellRendererComponent;
    }
    else if (column.type === 'checkbox') {
      column.cellRendererFramework = CheckboxCellRendererComponent;
    }
    else if (column.type === 'lookup' && column.editable) {
      column.cellRendererFramework = TableColumnLookupRendererComponent;
    }
    else {
      column.cellRendererFramework = DefaultCellRendererComponent;
    }

  }

}
