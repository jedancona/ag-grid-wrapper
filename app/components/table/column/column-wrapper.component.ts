/* tslint:disable */
import { Component, ViewEncapsulation, ContentChildren, QueryList } from '@angular/core';
import { TableColumnComponent } from './column.component';

@Component({
  selector: 'ui-table-column-wrapper',
  template: '',
  // tell angular we don't want view encapsulation, we don't want a shadow root
  encapsulation: ViewEncapsulation.None
})

export class TableColumnWrapperComponent {
  @ContentChildren(TableColumnComponent) public columns: QueryList<TableColumnComponent>;
  constructor() {
  }
}
