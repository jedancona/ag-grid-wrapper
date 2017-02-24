/* tslint:disable */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdSlideToggleModule } from '@angular/material';
import { TableColumnSlideToggleEditorComponent } from './slide-toggle-editor.component';
import { TableColumnSlideToggleRendererComponent } from './slide-toggle-renderer.component'
import { TableColumnContextMenuModule } from '../context-menu/index';
// All ng2 services must be listed here as a provider to allow the injector to work
const subModules = [
  TableColumnSlideToggleEditorComponent,
  TableColumnSlideToggleRendererComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdSlideToggleModule,
    TableColumnContextMenuModule,
  ],
  exports: [ subModules ],
  declarations: [ subModules ],
  entryComponents: [ subModules ],
})
export class TableColumnSlideToggleModule {
}

