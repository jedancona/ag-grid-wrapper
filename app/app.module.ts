import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {MaterialModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import 'hammerjs';
import {CommonComponentsModule} from './components/components.module';
import {RowSingleSelectComponent} from './components/table/row-single-select/row-single-select';
import {RowActionMenuComponent} from './components/table/row-action-menu/row-action-menu';
import {Routes, RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';

import {NumericEditorComponent} from './components/table/editors/numeric-editor';
import {SelectEditorComponent} from './components/table/editors/select-editor.component';
import {TextEditorComponent} from './components/table/editors/text-editor';

import {ComponentPlaygroundComponent} from './examples/component-playground/component-playground.component'
import {FooterRowGridComponent} from './examples/footer-row-grid/footer-row-grid.component';
import {SingleSelectGridComponent} from './examples/single-select-grid/single-select-grid.component';
import {MultiGridScreenComponent} from './examples/multi-grid-screen/multi-grid-screen.component';
import {MultiSelectGridComponent} from './examples/multi-select-grid/multi-select-grid.component';
import {DateCellRendererComponent} from "./components/table/cell/render/date-cell-renderer.component";
import {DefaultCellRendererComponent} from "./components/table/cell/render/default-cell-renderer.component";
import {ETCodeCellRendererComponent} from "./components/table/cell/render/et-code-cell-renderer.component";
import {SelectEditorDirective} from "./components/table/editors/select-editor.directive";


const appRoutes: Routes = [
  {path: 'single-select-grid', component: SingleSelectGridComponent, data: {title: 'Single Select Grid'}},
  {path: 'multi-select-grid', component: MultiSelectGridComponent, data: {title: 'Multiple Select Grid'}},
  {path: 'multi-grid-screen', component: MultiGridScreenComponent, data: {title: 'Multi Grid Screen'}},
  {path: 'footer-row-grid', component: FooterRowGridComponent, data: {title: 'Footer Row Grid'}},
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
      SelectEditorComponent,
      TextEditorComponent,
      ETCodeCellRendererComponent,
      DateCellRendererComponent,
      DefaultCellRendererComponent,

    ]),
    RouterModule.forRoot(appRoutes),
  ],
  declarations: [
    AppComponent,
    RowSingleSelectComponent,
    RowActionMenuComponent,
    NumericEditorComponent,
    SelectEditorComponent,
    TextEditorComponent,
    ComponentPlaygroundComponent,
    FooterRowGridComponent,
    SingleSelectGridComponent,
    MultiGridScreenComponent,
    MultiSelectGridComponent,
    ETCodeCellRendererComponent,
    DateCellRendererComponent,
    DefaultCellRendererComponent,
    SelectEditorDirective,


  ],
  bootstrap: [AppComponent],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
})
export class AppModule {
}
