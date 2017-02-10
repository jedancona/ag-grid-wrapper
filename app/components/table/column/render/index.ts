import { NgModule } from '@angular/core';
import { DateCellRendererComponent } from "./date-cell-renderer.component";
import { DefaultCellRendererComponent } from "./default-cell-renderer.component";
import { ETCodeCellRendererComponent } from "./et-code-cell-renderer.component";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@angular/material";
// All ng2 services must be listed here as a provider to allow the injector to work
const subModules = [
  DateCellRendererComponent, DefaultCellRendererComponent, ETCodeCellRendererComponent
]
@NgModule({
  imports:[CommonModule, MaterialModule],
  exports: [subModules],
  declarations: [subModules],
  entryComponents:[subModules],
})
export class EteRendererModule {}
