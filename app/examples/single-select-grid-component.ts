import {Component} from "@angular/core";
import {BaseGridComponent} from "./base-grid";

@Component({
  selector: 'single-select-grid',
  templateUrl: 'app/examples/single-select-grid.component.tpl.html',
})
export class SingleSelectGridComponent extends BaseGridComponent {
  constructor() {
    super();
  }

  public saveRow = (rowEntity: any): Promise<any> => {
    let self = this;
    return new Promise(resolve => {
      setTimeout(() => resolve(self.processResolve(rowEntity)), 5000);
    });
  };

  public processResolve = (rowEntity: any): any => {
    console.debug('SavingRow', rowEntity);
    return {success: 'true'};
  }

}
