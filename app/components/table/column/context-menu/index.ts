/* tslint:disable */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { TableColumnContextMenuDirective } from './context-menu.directive';
import { TableColumnContextMenuComponent } from './context-menu.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    TableColumnContextMenuComponent,
    TableColumnContextMenuDirective,
  ],
  declarations: [
    TableColumnContextMenuComponent,
    TableColumnContextMenuDirective,
  ],
  entryComponents: [TableColumnContextMenuComponent],
})
export class TableColumnContextMenuModule {
}
