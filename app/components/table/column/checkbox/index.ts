/* tslint:disable */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdCheckboxModule } from '@angular/material';
import { TableColumnCheckboxEditorComponent } from './checkbox-editor.component';
import { TableColumnCheckboxRendererComponent } from './checkbox-renderer.component'
import { TableColumnContextMenuModule } from '../context-menu/index';
// All ng2 services must be listed here as a provider to allow the injector to work

const subModules = [
  TableColumnCheckboxEditorComponent,
  TableColumnCheckboxRendererComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdCheckboxModule,
    TableColumnContextMenuModule,
  ],
  exports: [ subModules ],
  declarations: [ subModules ],
  entryComponents: [ subModules ],
})
export class TableColumnCheckboxModule {
}

