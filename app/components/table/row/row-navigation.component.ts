import { ViewEncapsulation, Component} from "@angular/core";
import { AgRendererComponent } from "ag-grid-ng2";
@Component({
  moduleId: module.id + '',
  selector: 'row-navigation',
  templateUrl: 'row-navigation.component.tpl.html',
  encapsulation: ViewEncapsulation.None
})
export class RowNavigationComponent implements AgRendererComponent {
  private params:any;
  public menuItems: any;
  public menuName: string = "Manage";

  agInit(params: any): void {
    this.params = params;
    console.log('inside the nav menu setup');
    this.menuItems = params.colDef.data;
    this.setTitle();
  }

  public onClick = (method: any) : void =>{
    method(this.params.node.data);
  }

  public isDisabled = (method: any) : boolean => {
    if(method){
      return method(this.params.node.data);
    }
    return false;
  }

  private setTitle = () => {
    let firstSection = this.menuItems.sections[0];
    if(firstSection) {
      this.menuName = this.menuName + " " + firstSection.name;
    }
  }
}
