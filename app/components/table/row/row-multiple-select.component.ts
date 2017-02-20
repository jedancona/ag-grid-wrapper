/* tslint:disable */
import { ViewEncapsulation, Component } from "@angular/core";
import { AgRendererComponent } from "ag-grid-ng2";
import { RowNode } from "ag-grid";


@Component({
  moduleId: module.id + '',
  selector: 'row-multiple-select',
  template: `<md-checkbox [(checked)]="rowNode.selected" (change)="valueChanged($event)" aria-label="check box" ></md-checkbox>`,
  encapsulation: ViewEncapsulation.None
})

export class RowMultipleSelectComponent implements AgRendererComponent {
  private params: any;
  private rowNode: RowNode;

  agInit(params: any): void {
    this.params = params;
    this.rowNode = params.node;

  }

  public valueChanged = ($event: any) :void => {
    console.log('value changed', $event);
  }

  public onRowSelected = ($event: any) :void => {
    console.log('row selected', $event);
  }

}
