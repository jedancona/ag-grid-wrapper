/* tslint:disable */
import {
  Component, ViewEncapsulation, Input, ContentChildren, QueryList, OnDestroy,
  ComponentFactory, Output, EventEmitter
} from '@angular/core';
import { ColDef } from 'ag-grid/main';
import { TableComponent } from '../table.component';

@Component({
  selector: 'ui-table-column',
  template: '',
  // tell angular we don't want view encapsulation, we don't want a shadow root
  encapsulation: ViewEncapsulation.None
})

export class TableColumnComponent implements OnDestroy {

  public suppressMovable: boolean = true;
  @ContentChildren(TableColumnComponent) public childColumns: QueryList<TableColumnComponent>;

  constructor(private tableComponent: TableComponent) {
    this.tableComponent.addColumn(this);
  }

  ngOnDestroy(): void {
    this.tableComponent.removeColumn(this);
  }

  public hasChildColumns(): boolean {
    if (this.childColumns && this.childColumns.length > 0) {
      // necessary because of https://github.com/angular/angular/issues/10098
      return !(this.childColumns.length === 1 && this.childColumns.first === this);
    }
    return false;
  }

  public toColDef(): ColDef {
    /*this.setColumnTypeEditor();
     this.setColumnCellFilter();*/
    let colDef: ColDef = this.createColDefFromGridColumn(this);
    if (this.hasChildColumns()) {
      (<any>colDef)[ "children" ] = this.getChildColDefs(this.childColumns);
    }
    return colDef;
  }

  private getChildColDefs(childColumns: QueryList<TableColumnComponent>) {
    return childColumns
    // necessary because of https://github.com/angular/angular/issues/10098
      .filter(column => !column.hasChildColumns())
      .map((column: TableColumnComponent) => {
        return column.toColDef();
      });
  };

  private createColDefFromGridColumn(from: TableColumnComponent): ColDef {
    let colDef: ColDef = {};
    Object.assign(colDef, from);
    delete (<any>colDef).childColumns;
    return colDef;
  };

  /**
   * @aggregationType {string} Only use if type is number and the table is set to show the footer row.
   *                           The calculation type used for the footer value aggregation.
   *                           Valid calculations are 'sum', 'avg', 'max', 'min', 'net'.
   *
   * @aggregationTypeNetExpression {any}  Only use if aggregationType is 'net'.  The result would be the some of the
   *                                      of the keyCol where key1 matched the value minus the sum of the values where
   *                                      key2 matched.
   *                                      {
   *                                          keyCol: 'column1', the column to lookup the keys from
   *                                          key1: 'D', - would be the column value. all rows would be summed for 'D'
   *                                          key2: 'R' - would be the column value. all rows would be summed for 'D'
   *                                      }
   *
   *
   * @cellClass {string} Override the cell class used for the column
   *
   * @displayName {string} The display name of the column
   *
   * @editDropdownCode {string}
   *
   * @editDropdownOptionsArray {Array<any>}  Only use if type is 'select'.  An array of options to be displayed
   *                                         in the select dropdown.
   *
   * @editDropdownValueId {string} Only use if type is 'select'.  The value to set the row item to when an
   *                               item is selected from the dropdown
   *
   * @editDropdownValueLabel {string} Only use if type is 'select'  The description of the item displayed in the
   *                                  dropdown.
   *
   * @enableEdit {boolean} Optional default is false. sets whether the column is enabled for editing.
   *
   * @floatingCellRenderer {any} Optional. An override for the ag grid floating cell renderer.
   *
   * @lookupAction {string} Optional. valid options are 'assign', 'key'. value is 'key' by default.
   *                       assign will assign the entire object selected overwriting values for
   *                       corresponding object variables.
   *
   * @lookupCallback {Promise<any>} Optional call back function that is fired when editing a lookup is completed.
   *                            This can be used to trigger a web service call in order to lookup additional information
   *                           about the value hand entered into a cell or to validate that the hand entered data is
   *                           valid input.
   *
   * @lookupComponent {ComponentFactory<any>} Required if the row is of type lookup. The Component Factory that will be
   *                                          dynamically injected into the modal. displayed in the lookup modal.
   *
   *
   * @lookupModalHeight {string} Optional The height of the lookup modal. value is '80%' by default.
   *
   * @lookupModalWidth {string}  Optional The width of the lookup modal. value is '80%' by default.
   *
   * @lookupModalTitle {string}  The Title to be displayed for the lookup modal.
   *
   * @minWidth {number} Optional. 50 by default.  The minimum with a column can be resized to.
   *
   * @name {any} the object field for the column.
   *
   * @toggleModelType {string} Optional Only needed if the column type is 'checkbox' or 'slide-toggle'.
   *                      Used to denote the type of model valid values are yesno, onezero.
   *                      yesno will make the toggle select use Y and N.
   *                      onezero will make the toggle select use 1 and 0.
   *                      default will make the toggle select use true and false.
   *
   * @type {string} Optional, default is text. valid options are 'text', 'numeric', 'date', 'select', 'lookup',
   *                'checkbox', 'slide-toggle'.
   *
   *
   */


  @Input() public aggregationType: string = undefined;
  @Input() public aggregationTypeNetExpression: any = undefined;

  @Input() public cellClass: string = undefined;
  @Input() public cellEditor: string = undefined;
  @Input('cell-filter') public cellFilter: string = undefined;

  @Input('display-name') public headerName: string = undefined;

  @Input() public editDropdownCode: string = undefined;
  @Input() public editDropdownOptionsArray: Array<any> = undefined;
  @Input() public editDropdownValueId: string = undefined;
  @Input() public editDropdownValueLabel: string = undefined;
  @Input('enable-edit') public editable: boolean = false;

  @Input() public floatingCellRenderer: any = undefined;

  /*
   * the defaults are set in the columnConfig factory so we don't have these items in the column model if
   * the column is not of type lookup
   */
  @Input() public lookupAction: string = undefined;
  @Output() public lookupCallback: EventEmitter<any> = new EventEmitter();
  @Input() public lookupComponent: ComponentFactory<any> = undefined;
  @Input() public lookupKey: string = undefined;
  @Input() public lookupModalHeight: string = undefined;
  @Input() public lookupModalWidth: string = undefined;
  @Input() public lookupModalTitle: string = undefined;

  @Input() public minWidth: number = 50;

  @Input('name') public field: any = undefined;

  @Input() public toggleModelType: string = undefined;
  @Input() public type: string = undefined;
  @Input() public volatile: boolean = true;

}
