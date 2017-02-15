/* tslint:disable */
import { Injectable } from '@angular/core';
import { DateCellRendererComponent } from './render/date-cell-renderer.component';
import { SlideToggleCellRendererComponent } from './render/slide-toggle-cell-renderer.component';
import { TextEditorComponent } from './editors/text-editor.component';
import { NumericEditorComponent } from './editors/numeric-editor.component';
import { SelectEditorComponent } from './editors/select-editor.component';
import { SlideToggleEditorComponent } from './editors/slide-toggle-editor.component';
import { DefaultCellRendererComponent } from './render/default-cell-renderer.component';
import { CheckboxCellRendererComponent } from './render/checkbox-cell-renderer.component';
import { CheckboxEditorComponent } from './editors/checkbox-editor.component';

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
        column.cellEditorFramework = TextEditorComponent;
      }
      if (column.type === 'number') {
        column.cellEditorFramework = NumericEditorComponent;
      }
      if (column.type === 'select') {
        column.cellEditorFramework = SelectEditorComponent;
        column.cellClass = 'editable select-dropdown';
      }
      if (column.type === 'slide-toggle') {
        column.cellRendererFramework = SlideToggleCellRendererComponent;
        column.cellEditorFramework = SlideToggleEditorComponent;
      }
      if (column.type === 'checkbox') {
        column.cellRendererFramework = CheckboxCellRendererComponent;
        column.cellEditorFramework = CheckboxEditorComponent;
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
    else {
      column.cellRendererFramework = DefaultCellRendererComponent;
    }
  }

}
