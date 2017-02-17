/* tslint:disable */
import { NgModule, ModuleWithProviders, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { Ng2FrameworkFactory, Ng2ComponentFactory, BaseComponentFactory } from 'ag-grid-ng2';
import { MaterialModule } from '@angular/material';
import { RowModules } from './row/index';
import { TableColumnModules } from './column/index';
import { TableColumnComponent } from './column/column.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RowModules,
    TableColumnModules,
  ],
  declarations: [
    TableComponent,
    TableColumnComponent,
  ],
  exports: [
    TableComponent,
    TableColumnComponent,
  ],
  entryComponents: []
})
export class TableModule {
  static withComponents(components?: any): ModuleWithProviders {
    if (!components) {
      components = [];
    }
    return {
      ngModule: TableModule,
      providers: [
        Ng2FrameworkFactory,
        Ng2ComponentFactory,
        { provide: BaseComponentFactory, useExisting: Ng2ComponentFactory },
        { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: components, multi: true }
      ],
    };
  }
}
