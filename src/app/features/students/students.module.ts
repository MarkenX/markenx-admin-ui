import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrimengModule } from '../../shared/modules/primeng.module';
import { BulkImportComponent } from './pages/bulk-import/bulk-import.component';
import { FormComponent } from './pages/form/form.component';
import { ListComponent } from './pages/list/list.component';
import { StudentsRoutingModule } from './students-routing.module';


@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    BulkImportComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    StudentsRoutingModule,
    PrimengModule
  ]
})
export class StudentsModule { }
