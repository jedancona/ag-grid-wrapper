/* tslint:disable */
import { Component } from "@angular/core";
import { AgRendererComponent } from "ag-grid-ng2";
@Component({
  moduleId: module.id + '',
  selector: 'table-column-date-renderer',
  template: '{{dateValue | date:DEFAULT_DATE_FORMAT}}'
})
export class TableColumnDateRendererComponent implements AgRendererComponent {
  private DEFAULT_DATE_FORMAT = 'MM/dd/y';
  private params: any;
  private dateValue: string;
  private filter: string;

  agInit(params: any): void {
    this.params = params;
    this.dateValue = this.params.value;
    this.filter = this.params.colDef.cellFilter;
    if (this.filter) {
      this.filter = this.filter.substring(this.filter.indexOf(':') + 1);
      this.DEFAULT_DATE_FORMAT = this.filter;
    }
  }

  refresh(params: any): void {
  }
}
