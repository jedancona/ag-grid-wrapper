import {NgModule, ModuleWithProviders, ANALYZE_FOR_ENTRY_COMPONENTS} from "@angular/core";
import {RowSingleSelectComponent} from "./row-single-select.component";
import {MaterialModule} from "@angular/material";
import {CommonModule} from "@angular/common";
import {RowActionMenuComponent} from "./row-action-menu.component";
import {RowAutoSaveFactory} from "./row-auto-save.factory";
import {RowFooterAggregationFactory} from "./row-footer-aggregation.factory";
import {RowModifiedFieldsFactory} from "./row-modified-fields.factory";
import {FormsModule} from "@angular/forms";
// All ng2 services must be listed here as a provider to allow the injector to work
const subModules = [
  RowSingleSelectComponent, RowActionMenuComponent
];

@NgModule({
  imports: [CommonModule, FormsModule, MaterialModule],
  exports: [subModules],
  declarations: [subModules],
  entryComponents: [subModules],
  providers: [RowAutoSaveFactory, RowFooterAggregationFactory, RowModifiedFieldsFactory]
})
export class RowModules {
}
