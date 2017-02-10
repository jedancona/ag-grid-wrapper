/* tslint:disable */
import {NgModule} from "@angular/core";
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
