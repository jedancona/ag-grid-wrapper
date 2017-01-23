import {NgModule}      from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent}  from './app.component';
import {MaterialModule} from '@angular/material';
import {CommonComponentsModule} from "./components/components.module";
import {RowSingleSelectComponent} from "./components/table/row-single-select/row-single-select";

@NgModule({
  imports: [BrowserModule, FormsModule,
    MaterialModule.forRoot(),
    CommonComponentsModule.withComponents([RowSingleSelectComponent]),
  ],
  declarations: [AppComponent, RowSingleSelectComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
