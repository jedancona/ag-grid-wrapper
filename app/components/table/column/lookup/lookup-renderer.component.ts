/* tslint:disable */
import { Component } from '@angular/core';
import { MdDialog } from '@angular/material';
import { AgRendererComponent } from 'ag-grid-ng2';
import { TableColumnLookupBaseComponent } from './lookup-base.component';

@Component({
  moduleId: module.id + '',
  selector: 'table-column-lookup-render',
  templateUrl: './lookup-renderer.component.tpl.html'
})
export class TableColumnLookupRendererComponent extends TableColumnLookupBaseComponent implements AgRendererComponent {

  constructor(dialog: MdDialog) {
    super(dialog);
  }

  agInit(params: any): void {
    this.params = params;
  }

}
