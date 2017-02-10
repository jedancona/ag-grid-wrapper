import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {MaterialModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import 'hammerjs';


import {Routes, RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';

import {ComponentPlaygroundComponent} from './examples/component-playground/component-playground.component'
import {FooterRowGridComponent} from './examples/footer-row-grid/footer-row-grid.component';
import {SingleSelectGridComponent} from './examples/single-select-grid/single-select-grid.component';
import {MultiGridScreenComponent} from './examples/multi-grid-screen/multi-grid-screen.component';
import {MultiSelectGridComponent} from './examples/multi-select-grid/multi-select-grid.component';
import {TableRootModule} from './components/module';


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
    TableRootModule,
    RouterModule.forRoot(appRoutes),
  ],
  declarations: [
    AppComponent,
    ComponentPlaygroundComponent,
    FooterRowGridComponent,
    SingleSelectGridComponent,
    MultiGridScreenComponent,
    MultiSelectGridComponent,
  ],
  bootstrap: [AppComponent],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
})
export class AppModule {
}
