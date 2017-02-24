/* tslint:disable */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableColumnDefaultEditorComponent } from './default-editor.component';
import { TableColumnDefaultRendererComponent } from './default-renderer.component'
import { TableColumnContextMenuModule } from '../context-menu/index';

// All ng2 services must be listed here as a provider to allow the injector to work
const subModules = [
  TableColumnDefaultEditorComponent,
  TableColumnDefaultRendererComponent,
];

@NgModule({
  imports: [ CommonModule, FormsModule, TableColumnContextMenuModule ],
  exports: [ subModules ],
  declarations: [ subModules ],
  entryComponents: [ subModules ],
})
export class TableColumnDefaultModule {
}
