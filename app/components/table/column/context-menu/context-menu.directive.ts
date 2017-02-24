import { Directive, Input, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { TableColumnContextMenuComponent } from './context-menu.component';

@Directive({
  selector: '[contextMenu]',
  host: { '(contextmenu)': 'rightClicked($event, params)' }
})
export class TableColumnContextMenuDirective {
  @Input() contextMenu: any;

  constructor(public viewContainerRef: ViewContainerRef,
              private _componentFactoryResolver: ComponentFactoryResolver) {
  }

  private rightClicked = (event: MouseEvent, params: any): void => {
    event.preventDefault(); // to prevent the browser contextmenu
    //create the context menu component on the fly so that it isn't attached to every cell by default.
    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(TableColumnContextMenuComponent);
    let componentRef: ComponentRef<TableColumnContextMenuComponent> = this.viewContainerRef.createComponent(componentFactory);
    // give the context menu time to resolve
    setTimeout(() => {
      componentRef.instance.openContextMenu(this.contextMenu);
    }, 200);
  };
}
