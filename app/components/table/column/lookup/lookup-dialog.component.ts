/* tslint:disable */
import { Component, ViewContainerRef, ViewChild, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  moduleId: module.id + '',
  selector: 'table-lookup-dialog',
  templateUrl: './lookup-dialog.component.tpl.html'
})
export class TableColumnLookupDialogComponent implements OnInit {
  public data: any;
  private componentRef: any;
  private title: string;
  @ViewChild('dialogComponent', { read: ViewContainerRef }) public targetEle: any;

  constructor(public dialogRef: MdDialogRef<TableColumnLookupDialogComponent>) {
  }

  ngOnInit(): void {
    this.title = this.data.colDef.lookupModalTitle;
    let componentFactory: any = this.targetEle.createComponent(this.data.component, 0);
    this.componentRef = componentFactory._component;
  }

  private ok = () => {
    this.dialogRef.close(this.componentRef.selectedItem);
  };

}
