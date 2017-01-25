import {NgModule}      from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent}  from './app.component';
import {MaterialModule} from '@angular/material';
import {CommonComponentsModule} from "./components/components.module";
import {RowSingleSelectComponent} from "./components/table/row-single-select/row-single-select";
import { RowActionMenuComponent } from "./components/table/row-action-menu/row-action-menu";

@NgModule({
  imports: [BrowserModule, FormsModule,
    MaterialModule.forRoot(),
    CommonComponentsModule.withComponents([RowSingleSelectComponent, RowActionMenuComponent]),
  ],
  declarations: [AppComponent, RowSingleSelectComponent, RowActionMenuComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
