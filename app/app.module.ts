import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {MaterialModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonComponentsModule} from './components/components.module';
import {RowSingleSelectComponent} from './components/table/row-single-select/row-single-select';
import {RowActionMenuComponent} from './components/table/row-action-menu/row-action-menu';
import {Routes, RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {NumericEditorComponent} from './components/table/editors/numeric-editor/numeric-editor';
import {TextEditorComponent} from './components/table/editors/text-editor/text-editor';

import {ComponentPlaygroundComponent} from './examples/component-playground/component-playground.component'
import {SingleSelectGridComponent} from './examples/single-select-grid/single-select-grid.component';
import {MultiGridScreenComponent} from './examples/multi-grid-screen/multi-grid-screen.component';
import {MultiSelectGridComponent} from './examples/multi-select-grid/multi-select-grid.component';

const appRoutes: Routes = [
  {path: 'single-select-grid', component: SingleSelectGridComponent, data: {title: 'Single Select Grid'}},
  {path: 'multi-select-grid', component: MultiSelectGridComponent, data: {title: 'Multiple Select Grid'}},
  {path: 'multi-grid-screen', component: MultiGridScreenComponent, data: {title: 'Multi Grid Screen'}},
  {path: 'component-playground', component: ComponentPlaygroundComponent, data: {title: 'Component Playground'}},
  {path: '', redirectTo: 'base-grid', pathMatch: 'full'}
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    CommonComponentsModule.withComponents([RowSingleSelectComponent,
      RowActionMenuComponent,
      SingleSelectGridComponent,
      MultiSelectGridComponent,
      NumericEditorComponent,
      TextEditorComponent,

    ]),
    RouterModule.forRoot(appRoutes),
  ],
  declarations: [
    AppComponent,
    RowSingleSelectComponent,
    RowActionMenuComponent,
    NumericEditorComponent,
    TextEditorComponent,
    ComponentPlaygroundComponent,
    SingleSelectGridComponent,
    MultiGridScreenComponent,
    MultiSelectGridComponent,


  ],
  bootstrap: [AppComponent],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
})
export class AppModule {
}
