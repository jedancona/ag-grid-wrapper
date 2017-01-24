import { ViewEncapsulation, Component } from "@angular/core";
import { AgRendererComponent } from "ag-grid-ng2";
@Component({
  selector: 'row-action-menu',
  templateUrl: 'app/components/table/row-action-menu/row-action-menu-tpl.html',
  // tell angular we don't want view encapsulation, we don't want a shadow root
  //TODO Jed do we need this ViewEncapsulation?
  encapsulation: ViewEncapsulation.None
})
//TODO what is agrenderercomponent do
export class RowActionMenuComponent implements AgRendererComponent {
  private params:any;
  public menuItems: any;

  agInit(params: any): void {
    this.params = params
    this.menuItems = params.colDef.data;
  }
}
