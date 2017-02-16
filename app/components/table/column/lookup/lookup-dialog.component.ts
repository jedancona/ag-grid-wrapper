/* tslint:disable */
import { Component, ViewContainerRef, ViewChild, ComponentFactoryResolver, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'table-lookup-dialog-component',
  templateUrl: './lookup-dialog.component.tpl.html'
})
export class TableColumnLookupDialogComponent implements OnInit {
  public data: any;

  @ViewChild('dialogComponent', { read: ViewContainerRef }) public targetEle: any;

  constructor(public dialogRef: MdDialogRef<TableColumnLookupDialogComponent>) {
  }

  ngOnInit(): void {
    this.targetEle.createComponent(this.data.component, 0);
  }

  private ok = () => {
    this.dialogRef.close({somedata: 'none'});
  }


}
