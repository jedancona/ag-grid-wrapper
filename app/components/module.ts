/* tslint:disable */
import {NgModule} from "@angular/core";
import {TableModule} from "./table/table.module";
export * from './table/column/lookup/lookup-dialog';

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
