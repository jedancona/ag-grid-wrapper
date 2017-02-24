/* tslint:disable */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { TableColumnLookupDialogComponent } from './lookup-dialog.component';
import { TableColumnLookupEditorComponent } from './lookup-editor.component';
import { TableColumnLookupRendererComponent } from './lookup-renderer.component'
import { TableColumnContextMenuModule } from '../context-menu/index';

// All ng2 services must be listed here as a provider to allow the injector to work
const subModules = [
  TableColumnLookupEditorComponent,
  TableColumnLookupDialogComponent,
  TableColumnLookupRendererComponent,
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    TableColumnContextMenuModule,
  ],
  exports: [ subModules ],
  declarations: [ subModules ],
  entryComponents: [ subModules ],
})
export class TableColumnLookupModule {
}

