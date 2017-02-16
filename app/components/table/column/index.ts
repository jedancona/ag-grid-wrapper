import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { TableColumnLookupModule } from './lookup/index'
import { TableColumnEditorsModule } from './editors/index';
import { TableColumnRendererModule } from './render/index';
import { TableColumnConfigFactory } from './column-config.factory';
import { TableColumnComponent } from './column.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    TableColumnLookupModule,
    TableColumnEditorsModule,
    TableColumnRendererModule,
  ],
  providers: [ TableColumnConfigFactory, ]
})
export class TableColumnModules {
}
