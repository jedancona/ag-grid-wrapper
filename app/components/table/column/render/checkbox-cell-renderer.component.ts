/* tslint:disable */
import { Component } from '@angular/core';
import { SlideToggleCellRendererComponent } from './slide-toggle-cell-renderer.component';
@Component({
  selector: 'checkbox-cell',
  template: '<md-checkbox (change)="sliderChanged($event)" [checked]="isChecked()" [disabled]="isEditable()" aria-label="slide" ></md-checkbox>'
})
export class CheckboxCellRendererComponent extends SlideToggleCellRendererComponent {

}
