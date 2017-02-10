/* tslint:disable */
import {NgModule, ModuleWithProviders, ANALYZE_FOR_ENTRY_COMPONENTS} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableComponent} from './table/table.component';
import {Ng2FrameworkFactory, Ng2ComponentFactory, BaseComponentFactory} from 'ag-grid-ng2';
import {TableModule} from "./table/table.module";


const MODULES = [
  TableModule,
];

@NgModule({
  imports: [
    TableModule.withComponents([]),
  ],
  exports: MODULES,
})
export class TableRootModule { }
