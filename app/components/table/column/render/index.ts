import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { DateCellRendererComponent } from './date-cell-renderer.component';
import { DefaultCellRendererComponent } from './default-cell-renderer.component';
import { ETCodeCellRendererComponent } from './et-code-cell-renderer.component';
import { SlideToggleCellRendererComponent } from './slide-toggle-cell-renderer.component';
import { CheckboxCellRendererComponent } from './checkbox-cell-renderer.component';

// All ng2 services must be listed here as a provider to allow the injector to work
const subModules = [
  CheckboxCellRendererComponent,
  DateCellRendererComponent,
  DefaultCellRendererComponent,
  ETCodeCellRendererComponent,
  SlideToggleCellRendererComponent,
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
  ],
  exports: [ subModules ],
  declarations: [ subModules ],
  entryComponents: [ subModules ],
})
export class EteRendererModule {
}
