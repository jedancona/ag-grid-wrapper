/* tslint:disable */
import {NgModule, ModuleWithProviders, ANALYZE_FOR_ENTRY_COMPONENTS} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableComponent} from './table/table.component';
import {Ng2FrameworkFactory, Ng2ComponentFactory, BaseComponentFactory} from 'ag-grid-ng2';
import {TableColumnComponent} from './table/column/column';
import {MaterialModule} from '@angular/material';
import {RowAutoSaveFactory} from './table/row/row-auto-save.factory';
import {RowFooterAggregationFactory} from './table/row/row-footer-aggregation.factory';
import {RowModifiedFieldsFactory} from "./table/row/row-modified-fields.factory";

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [
    TableComponent,
    TableColumnComponent,
  ],
  exports: [TableComponent, TableColumnComponent],
  entryComponents: []
})
export class CommonComponentsModule {
  static withComponents(components?: any): ModuleWithProviders {
    if (!components) {
      components = [];
    }
    return {
      ngModule: CommonComponentsModule,
      providers: [
        Ng2FrameworkFactory,
        Ng2ComponentFactory,
        RowAutoSaveFactory,
        RowFooterAggregationFactory,
        RowModifiedFieldsFactory,
        {provide: BaseComponentFactory, useExisting: Ng2ComponentFactory},
        {provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: components, multi: true}
      ],
    };
  }
}
