import { NgModule } from '@angular/core';
import { RowSingleSelectComponent } from './row-single-select.component';
import { MaterialModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { RowActionMenuComponent } from './row-action-menu.component';
import { TableRowAddFactory } from './row-edit-add.factory';
import { TableRowAutoSaveFactory } from './row-edit-auto-save.factory';
import { TableRowFactory } from './row.factory';
import { TableRowEditFactory } from './row-edit.factory';
import { TableRowFooterAggregationFactory } from './row-footer-aggregation.factory';
import { TableRowModifiedFieldsFactory } from './row-edit-modified-fields.factory';
import { FormsModule } from '@angular/forms';

// All ng2 services must be listed here as a provider to allow the injector to work
const subModules = [
  RowSingleSelectComponent,
  RowActionMenuComponent,
];

@NgModule({
  imports: [ CommonModule, FormsModule, MaterialModule ],
  exports: [ subModules ],
  declarations: [ subModules ],
  entryComponents: [ subModules ],
  providers: [
    TableRowFactory,
    TableRowEditFactory,
    TableRowAddFactory,
    TableRowAutoSaveFactory,
    TableRowFooterAggregationFactory,
    TableRowModifiedFieldsFactory,
  ]
})
export class RowModules {
}
