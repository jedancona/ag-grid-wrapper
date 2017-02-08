import {Component} from "@angular/core";

@Component({
  selector: 'footer-row-grid',
  templateUrl: 'app/examples/footer-row-grid/footer-row-grid.component.tpl.html',
})
export class FooterRowGridComponent {

  data: any = [];
  radioGroupValue: any;
  listActionMenu: any;
  selectionMode: boolean = true;
  selectedRows: any[] = [];

  constructor() {
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
  }

  public viewAssociation = (row: any): void => {
    console.log('in the view association', row);
  }

  public validateLink = (row: any): boolean => {
    return row.column2 % 2 === 0;
  }

  public selection = ($event: any): void => {
    this.selectedRows = $event;
  }

}
