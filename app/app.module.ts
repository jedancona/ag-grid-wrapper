import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { MaterialModule } from "@angular/material";
import { CommonComponentsModule } from "./components/components.module";
import { RowSingleSelectComponent } from "./components/table/row-single-select/row-single-select";
import { RowActionMenuComponent } from "./components/table/row-action-menu/row-action-menu";
import { Routes, RouterModule } from "@angular/router";
import { SingleSelectGridComponent } from "./examples/single-select-grid-component";
import { APP_BASE_HREF } from "@angular/common";
import { MultiSelectGridComponent } from "./examples/multi-select-grid-component";

const appRoutes: Routes = [
  {path: 'single-grid-grid', component: SingleSelectGridComponent, data: {title: "Rich Grid with Pure JavaScript"}},
  {path: 'multi-select-grid', component: MultiSelectGridComponent, data: {title: "Using Dynamic Components"}},
  {path: '', redirectTo: 'base-grid', pathMatch: 'full'}
];
@NgModule({
  imports: [BrowserModule, FormsModule,
    MaterialModule.forRoot(),
    CommonComponentsModule.withComponents([RowSingleSelectComponent,
      RowActionMenuComponent,
      SingleSelectGridComponent,
      MultiSelectGridComponent]),
    RouterModule.forRoot(appRoutes),
  ],
  declarations: [AppComponent,
    RowSingleSelectComponent,
    RowActionMenuComponent,
    SingleSelectGridComponent,
    MultiSelectGridComponent],
  bootstrap: [AppComponent],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
})
export class AppModule {
}
