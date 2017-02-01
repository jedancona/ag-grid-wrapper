import {Component} from "@angular/core";

@Component({
  selector: '[componentPlayground]',
  templateUrl: 'app/examples/component-playground/component-playground.component.tpl.html',
  styleUrls: ['app/examples/component-playground/component-playground.component.less']
})
export class ComponentPlaygroundComponent {
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

  }


}
