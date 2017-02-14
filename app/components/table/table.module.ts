/* tslint:disable */
import { NgModule, ModuleWithProviders, ANALYZE_FOR_ENTRY_COMPONENTS } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableComponent } from "./table.component";
import { Ng2FrameworkFactory, Ng2ComponentFactory, BaseComponentFactory } from "ag-grid-ng2";
import { TableColumnComponent } from "./column/column.component";
import { MaterialModule } from "@angular/material";
import { RowModules } from "./row/index";
import { EteRendererModule } from "./column/render/index";
import { TableColumnEditorsModule } from "./column/editors/index";
import { TableColumnWrapperComponent } from './column/column-wrapper.component';

@NgModule({
  imports: [ CommonModule, MaterialModule, RowModules, EteRendererModule, TableColumnEditorsModule ],
  declarations: [
    TableComponent,
    TableColumnWrapperComponent,
    TableColumnComponent,
  ],
  exports: [
    TableComponent,
    TableColumnWrapperComponent,
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
