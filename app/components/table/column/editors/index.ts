import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@angular/material";
import {NumericEditorComponent} from "./numeric-editor.component";
import {SelectEditorComponent} from "./select-editor.component";
import {TextEditorComponent} from "./text-editor.component";
import {SelectEditorDirective} from "./select-editor.directive";
import {FormsModule} from "@angular/forms";
// All ng2 services must be listed here as a provider to allow the injector to work
const subModules = [
  NumericEditorComponent,
  TextEditorComponent,
  SelectEditorComponent,
];

@NgModule({
  imports: [CommonModule, MaterialModule, FormsModule],
  exports: [subModules],
  declarations: [subModules, SelectEditorDirective],
  entryComponents: [subModules],
})
export class TableColumnEditorsModule {
}
