import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { WjGridModule } from '@mescius/wijmo.angular2.grid';
import { WjInputModule } from '@mescius/wijmo.angular2.input';
import { WjCoreModule } from '@mescius/wijmo.angular2.core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccessibleEditingComponent } from './accessible-editing/accessible-editing.component';
import { DashboardComponent } from './dashboard.component';
import { FirmFlowComponent } from './firm-flow/firm-flow.component';
import { CheckboxInFirstColumnComponent } from './checkbox-in-first-column/checkbox-in-first-column.component';
import { MultipleComponentsInCellsComponent } from './multiple-components-in-cells/multiple-components-in-cells.component';
import { InlineValidationComponent } from './inline-validation/inline-validation.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AccessibleEditingComponent,
    FirmFlowComponent,
    CheckboxInFirstColumnComponent,
    MultipleComponentsInCellsComponent,
    InlineValidationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WjCoreModule,
    WjGridModule,
    WjInputModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
