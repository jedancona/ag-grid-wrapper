/* tslint:disable */
import { Component, ViewChild, OnDestroy } from '@angular/core';
import { MdMenuTrigger } from '@angular/material';
import * as _ from 'lodash';
import { Clipboard } from 'ts-clipboard';

@Component({
  moduleId: module.id + '',
  selector: 'table-column-context-menu-component',
  templateUrl: './context-menu.component.tpl.html'
})
export class TableColumnContextMenuComponent implements OnDestroy {
  private params: any;
  @ViewChild(MdMenuTrigger) public trigger: MdMenuTrigger;

  constructor() {
  }

  ngOnDestroy() {
    this.params = null;
    this.trigger.destroyMenu();
  }

  public openContextMenu = (params: any) => {
    this.params = params;
    this.trigger.openMenu();
  };

  public copyCell = (): void => {
    let text: string;
    if (this.params && !_.isUndefined(this.params.value)) {
      text = _.clone(this.params.value) + '';
      this.copyText(text);
    }
  };

  public copyRow = (): void => {
    console.debug('copy row');
    if (this.params && !_.isUndefined(this.params.data)) {
      let text: string = _.valuesIn(this.params.data).join(',');
      this.copyText(text);
    }
  };

  public copyTable = (): void => {
    if (this.params && this.params.api) {
      let text: string = this.params.api.getDataAsCsv({});
      this.copyText(text);
    }
  };

  public exportTableAsCsv = (): void => {
    console.debug('export table as csv', this.params);
    this.params.api.exportDataAsCsv({});
  };

  public copyText = (text: string): void => {
    if (text) {
      Clipboard.copy(text);
    }
  };

}
