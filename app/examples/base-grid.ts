import { Component } from "@angular/core";

@Component({
  selector: 'base-grid',
  templateUrl: 'app/examples/base-grid.component.tpl.html',
})
export class BaseGridComponent {
  name = ', Jeremy';
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
      this.data.push({
        column1: 'col 1 row ' + i,
        column2: i + '',
        column3: i,
        column4: i + '',
        column5: i + '',
        column6: i + '',
        column7: i + ''
      });
    }
  }

  public deleteAssociation = (row: any): void => {
    console.log('in the delete', row);
  }

  public viewAssociation = (row: any): void => {
    console.log('in the view association', row);
  }

  public validateLink = (row: any): boolean => {
    return row.column2 % 2 === 0;
  }

  public selection = ($event: any) : void => {
    this.selectedRows = $event;
  }

}
