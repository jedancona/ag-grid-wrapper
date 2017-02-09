/* tslint:disable */
import {ViewEncapsulation, Component} from '@angular/core';
import {AgRendererComponent} from 'ag-grid-ng2';
@Component({
  moduleId: module.id,
  selector: 'row-single-select',
  templateUrl: 'row-single-select.component.tpl.html',
  // tell angular we don't want view encapsulation, we don't want a shadow root
  encapsulation: ViewEncapsulation.None
})

export class RowSingleSelectComponent implements AgRendererComponent {
  private params: any;

  agInit(params: any): void {
    this.params = params
  }

  public onBlur = (): void => {
    this.params.api.gridCore.gridOptions.onCellEditingStopped.emit(this.params);
  }
}
