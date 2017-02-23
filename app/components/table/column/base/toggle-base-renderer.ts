import { AgRendererComponent } from 'ag-grid-ng2';

export class TableColumnToggleBaseRenderer implements AgRendererComponent {
  protected params: any;
  protected modelType: any;
  public value: any;

  agInit(params: any): void {
    this.params = params;
    this.modelType = this.params.colDef.toggleModelType;
  }
  public toggleClicked = ($event: any): void => {
    $event.stopPropagation();
  };

  public valueChanged = ($event: any): void => {
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
    let gridRow: any = this.params.node;
    this.params.api.rowEdit.setGridRowDirty(this.params.api, gridRow);
    this.params.api.refreshRows([ gridRow ]);
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
