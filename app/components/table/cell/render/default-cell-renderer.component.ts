import { Component } from "@angular/core";
import { AgRendererComponent } from "ag-grid-ng2";
@Component({
  selector: 'default-cell',
  template: '<div class="inner-cell" >{{params.value}}</div>'
})
export class DefaultCellRendererComponent implements AgRendererComponent {
  private params: any;
  agInit(params: any): void {
    this.params = params;
  }
}
