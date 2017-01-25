import { Component } from "@angular/core";

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.tpl.html',
})
export class AppComponent {
  name = ', Jeremy';
  data: any = [];
  radioGroupValue: any;
  listActionMenu: any;

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
          'method': 'viewAssociation'
        }
      ]
    };

    for (let i = 0; i < 25; i++) {
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

  public deleteAssociation = (row: any): any => {
    console.log('in the delete', row);
  }

  public viewAssociation = (row: any): any => {
    console.log('in the view association', row);
  }

}
