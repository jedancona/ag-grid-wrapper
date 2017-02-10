import {NgModule} from "@angular/core";
import {RowSingleSelectComponent} from "./row-single-select.component";
import {MaterialModule} from "@angular/material";
import {CommonModule} from "@angular/common";
import {RowActionMenuComponent} from "./row-action-menu.component";
import {RowAutoSaveFactory} from "./row-auto-save.factory";
import {TableRowFactory} from './row.factory';
import {RowFooterAggregationFactory} from "./row-footer-aggregation.factory";
import {RowModifiedFieldsFactory} from "./row-modified-fields.factory";
import {FormsModule} from "@angular/forms";
import {RowAddFactory} from "./row-add.factory";
// All ng2 services must be listed here as a provider to allow the injector to work
const subModules = [
  RowSingleSelectComponent, RowActionMenuComponent
];

@NgModule({
  imports: [CommonModule, FormsModule, MaterialModule],
  exports: [subModules],
  declarations: [subModules],
  entryComponents: [subModules],
  providers: [TableRowFactory, RowAddFactory, RowAutoSaveFactory, RowFooterAggregationFactory, RowModifiedFieldsFactory]
})
export class RowModules {
}
