/* tslint:disable */
import { Component } from "@angular/core";
import { AgRendererComponent } from "ag-grid-ng2";
@Component({
  selector: 'et-code-cell',
  template: '{{etCodeValue()}}'
})
export class ETCodeCellRendererComponent implements AgRendererComponent {
  private params: any;
  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): void {
  }

  public etCodeValue = (): string => {
    return 'CRAP';
  }

}
