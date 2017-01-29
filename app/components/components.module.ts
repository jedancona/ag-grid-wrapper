import {NgModule, ModuleWithProviders, ANALYZE_FOR_ENTRY_COMPONENTS} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TableComponent} from "./table/table";
import {Ng2FrameworkFactory, Ng2ComponentFactory, BaseComponentFactory} from "ag-grid-ng2";
import {RowAutoSaveFactory} from "./table/factories/row-auto-save/row-auto-save";
import {TableColumnComponent} from "./table/column/column";
import {MaterialModule} from "@angular/material";

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
    if (!components) components = [];
    return {
      ngModule: CommonComponentsModule,
      providers: [
        Ng2FrameworkFactory,
        Ng2ComponentFactory,
        RowAutoSaveFactory,
        {provide: BaseComponentFactory, useExisting: Ng2ComponentFactory},
        {provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: components, multi: true}
      ],
    };
  }
}
