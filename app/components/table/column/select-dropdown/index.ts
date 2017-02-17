/* tslint:disable */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdSelectModule } from '@angular/material';

import { TableColumnSelectDropdownEditorComponent } from './select-dropdown-editor.component';
import { TableColumnSelectDropdownEditorDirective } from './select-dropdown-editor.directive';

const subModules = [
  TableColumnSelectDropdownEditorComponent,
];

@NgModule({
  imports: [ CommonModule, MdSelectModule, FormsModule ],
  exports: [ subModules ],
  declarations: [ subModules, TableColumnSelectDropdownEditorDirective ],
  entryComponents: [ subModules ],
})
export class TableColumnSelectDropdownModule {
}
