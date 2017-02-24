/* tslint:disable */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { TableColumnConfigFactory } from './column-config.factory';

import { TableColumnCheckboxModule } from './checkbox/index';
import { TableColumnDateModule } from './date/index';
import { TableColumnDefaultModule } from './default/index';
import { TableColumnLookupModule } from './lookup/index';
import { TableColumnNumericModule } from './numeric/index';
import { TableColumnSelectDropdownModule } from './select-dropdown/index';
import { TableColumnSlideToggleModule } from './slide-toggle/index';
import { TableColumnContextMenuModule } from './context-menu/index';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    TableColumnCheckboxModule,
    TableColumnContextMenuModule,
    TableColumnDateModule,
    TableColumnDefaultModule,
    TableColumnLookupModule,
    TableColumnNumericModule,
    TableColumnSelectDropdownModule,
    TableColumnSlideToggleModule,
  ],
  providers: [ TableColumnConfigFactory, ]
})
export class TableColumnModules {
}
