/* tslint:disable */
import { Component } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-ng2';
@Component({
  selector: 'slide-toggle-cell',
  template: '<md-slide-toggle (change)="sliderChanged($event)" [checked]="isChecked()" [disabled]="isEditable()" aria-label="slide" ></md-slide-toggle>'
})
export class SlideToggleCellRendererComponent implements AgRendererComponent {
  protected params: any;
  protected modelType: any;
  public value: any;

  agInit(params: any): void {
    this.params = params;
    this.modelType = this.params.colDef.modelType;
  }

  public sliderChanged = ($event: any): void => {
    switch (this.modelType) {
      case 'yesno':
        this.setYesNoModelValue($event.checked);
        break;
      case 'onezero':
        this.setOneZeroModelValue($event.checked);
        break;
      default:
        this.setTrueFalseModelValue($event.checked);
    }
  };

  public isChecked = (): boolean => {
    let modelValue: any = this.params.data[ this.params.colDef.field ];
    switch (this.modelType) {
      case 'yesno':
        return this.getYesNoModelValue();
      case 'onezero':
        return this.getOneZeroModelValue();
      default:
        return this.getTrueFalseModelValue();
    }
  };

  public isEditable = (): boolean => {
    return !this.params.colDef.editable;
  };

  protected getYesNoModelValue = (): boolean => {
    return this.params.data[ this.params.colDef.field ] === 'Y';
  };

  protected getTrueFalseModelValue = (): boolean => {
    return this.params.data[ this.params.colDef.field ];
  };

  protected getOneZeroModelValue = (): boolean => {
    return this.params.data[ this.params.colDef.field ] === 1;
  };

  protected setYesNoModelValue = (checked: boolean): void => {
    if (checked) {
      this.params.data[ this.params.colDef.field ] = 'Y';
    }
    else {
      this.params.data[ this.params.colDef.field ] = 'N';
    }
  };

  protected setTrueFalseModelValue = (checked: boolean): void => {
    this.params.data[ this.params.colDef.field ] = checked;
  };

  protected setOneZeroModelValue = (checked: boolean): void => {
    if (checked) {
      this.params.data[ this.params.colDef.field ] = 1;
    }
    else {
      this.params.data[ this.params.colDef.field ] = 0;
    }
  }

}
