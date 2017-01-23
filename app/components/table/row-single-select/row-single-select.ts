import {ViewEncapsulation, Component} from "@angular/core";
import {AgRendererComponent} from "ag-grid-ng2";
@Component({
  selector: 'row-single-select',
  templateUrl: 'app/components/table/row-single-select/row-single-select.tpl.html',
  // tell angular we don't want view encapsulation, we don't want a shadow root
  encapsulation: ViewEncapsulation.None
})

export class RowSingleSelectComponent implements AgRendererComponent {
  private params: any;

  agInit(params: any): void {
    this.params = params
  }
}
