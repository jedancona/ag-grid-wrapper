/* tslint:disable */
import { ViewEncapsulation, Component } from "@angular/core";
import { AgRendererComponent } from "ag-grid-ng2";
import { RowNode } from "ag-grid";


@Component({
  moduleId: module.id,
  selector: 'row-single-select',
  template: `<md-radio-button  [(checked)]="rowNode.selected" [(value)]="rowNode.id" ></md-radio-button>`,
  encapsulation: ViewEncapsulation.None
})

export class RowSingleSelectComponent implements AgRendererComponent {
  private params: any;
  private rowNode: RowNode;

  agInit(params: any): void {
    this.params = params;
    this.rowNode = params.node;

  }

}
