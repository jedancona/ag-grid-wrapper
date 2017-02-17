/* tslint:disable */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableColumnDateRendererComponent } from './date-renderer.component'

// All ng2 services must be listed here as a provider to allow the injector to work
const subModules = [
  TableColumnDateRendererComponent,
];

@NgModule({
  imports: [ CommonModule, FormsModule ],
  exports: [ subModules ],
  declarations: [ subModules ],
  entryComponents: [ subModules ],
})
export class TableColumnDateModule {
}
