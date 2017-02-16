import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { TableColumnEditorNumericComponent } from './numeric-editor.component';
import { TableColumnEditSelectDropdownComponent } from './select-editor.component';
import { TableColumnEditTextComponent } from './text-editor.component';
import { TableColumnEditSelectDropdownDirective } from './select-editor.directive';
import { TableColumnEditorSlideToggleComponent } from './slide-toggle-editor.component';
import { TableColumnEditorCheckboxComponent } from './checkbox-editor.component';
// All ng2 services must be listed here as a provider to allow the injector to work
const subModules = [
  TableColumnEditorCheckboxComponent,
  TableColumnEditorNumericComponent,
  TableColumnEditTextComponent,
  TableColumnEditSelectDropdownComponent,
  TableColumnEditorSlideToggleComponent,
];

@NgModule({
  imports: [ CommonModule, MaterialModule, FormsModule ],
  exports: [ subModules ],
  declarations: [ subModules, TableColumnEditSelectDropdownDirective ],
  entryComponents: [ subModules ],
})
export class TableColumnEditorsModule {
}
