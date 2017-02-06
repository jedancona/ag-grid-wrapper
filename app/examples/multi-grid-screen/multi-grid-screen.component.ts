import {Component} from '@angular/core';
import {BaseGridComponent} from '../base-grid';

@Component({
  selector: 'multi-grid-screen',
  templateUrl: 'app/examples/multi-grid-screen/multi-grid-screen.component.tpl.html',
})
export class MultiGridScreenComponent extends BaseGridComponent {
  public data2: any = [];

  constructor() {
    super();

    for (let i = 0; i < 10; i++) {
      this.data2.push({
        column1: 'long string of data col 1 row ' + i,
        column2: i + '',
        column3: i,
        column4: i + '',
        column5: i + '',
        column6: i + '',
        column7: i + ''
      });
    }
  }

  public saveRow = (rowEntity: any): Promise<any> => {
    let self = this;
    return new Promise(resolve => {
      setTimeout(() => resolve(self.processResolve(rowEntity)), 5000);
    });
  };


  public saveRow2 = (rowEntity: any): Promise<any> => {
    let self = this;
    return new Promise(resolve => {
      setTimeout(() => resolve(self.processResolve2(rowEntity)), 5000);
    });
  };

  public processResolve = (rowEntity: any): any => {
    console.debug('SavingRow', rowEntity);
    return {success: 'true'};
  }

  public processResolve2 = (rowEntity: any): any => {
    console.debug('SavingRow2', rowEntity);
    return {success: 'true'};
  }

}
