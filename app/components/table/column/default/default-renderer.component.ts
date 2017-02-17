/* tslint:disable */
import { Component } from "@angular/core";
import { AgRendererComponent } from "ag-grid-ng2";
@Component({
  moduleId: module.id,
  selector: 'table-column-default-renderer',
  templateUrl: './default-renderer.component.tpl.html'
})
export class TableColumnDefaultRendererComponent implements AgRendererComponent {
  private params: any;
  agInit(params: any): void {
    this.params = params;
  }
}
