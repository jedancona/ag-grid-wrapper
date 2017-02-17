import {Component, ComponentFactoryResolver} from "@angular/core";
import { SingleSelectGridComponent } from '../single-select-grid/single-select-grid.component';

@Component({
  selector: 'footer-row-grid',
  templateUrl: 'app/examples/footer-row-grid/footer-row-grid.component.tpl.html',
})
export class FooterRowGridComponent {

  data: any = [];
  gridOptions: any = {};
  radioGroupValue: any;
  listActionMenu: any;
  selectionMode: boolean = true;
  selectedRows: any[] = [];
  foods: any[] = [];
  singleSelectComponent: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    this.singleSelectComponent = this.componentFactoryResolver.resolveComponentFactory(SingleSelectGridComponent);

    this.init();
  }

  private init = (): void => {
    this.listActionMenu = {
      'title': 'Manage Address Association',
      'location': 'right',
      'items': [
        {
          'name': 'Delete Address Association',
          'icon': 'delete',
          'method': this.deleteAssociation
        },
        {
          'name': 'View Address',
          'action': 'view',
          'method': this.viewAssociation
        },
        {
          'name': 'Test Disable',
          'action': 'boat',
          'isDisable': this.validateLink,
          'method': this.viewAssociation
        }
      ]
    };

    this.foods = [
      {value: 'steak-0', viewValue: 'Steak'},
      {value: 'pizza-1', viewValue: 'Pizza'},
      {value: 'tacos-2', viewValue: 'Tacos'}
    ];

    for (let i = 0; i < 50; i++) {

      let rowObj: any = {
        column1: 'col 1 row ' + i,
        column2: i + '',
        column3: 0,
        column4: i,
        column5: i + '',
        column6: i + '',
        column7: i + '',
        column8: i,
        column9: 'R',
        column10: i
      };
      if (i % 2 === 0) {
        rowObj.column1 = 'D';
      }
      else {
        rowObj.column1 = 'R';
      }

      this.data.push(rowObj);
    }
  };

  public addRow = (): number => {
   let rowIdx: number =  this.gridOptions.api.rowEdit.addRow({
      column1: 'Added Row',
      column2: 'x',
      column3: 0,
      column4: 0,
      column5: 0 + '',
      column6: 0 + '',
      column7: 0 + '',
      column8: 0,
      column9: 'R',
      column10: 0
    }, 'column4');
   return rowIdx;
  };

  public saveRow = (rowEntity: any): Promise<any> => {
    let self = this;
    return new Promise(resolve => {
      setTimeout(() => resolve(self.processResolve(rowEntity)), 5000);
    });
  };

  public processResolve = (rowEntity: any): any => {
    console.debug('SavingRow', rowEntity);
    return {success: 'true'};
  };

  public deleteAssociation = (row: any): void => {
    console.log('in the delete', row);
    this.gridOptions.api.rowEdit.deleteRowByData(row);
  };

  public viewAssociation = (row: any): void => {
    console.log('in the view association', row);
  };

  public validateLink = (row: any): boolean => {
    return row.column2 % 2 === 0;
  };

  public selection = ($event: any): void => {

    this.selectedRows = $event;
  }

}
