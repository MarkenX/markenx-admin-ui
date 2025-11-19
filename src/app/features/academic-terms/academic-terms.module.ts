import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AcademicTermsRoutingModule } from './academic-terms-routing.module';
import { PrimengModule } from '../../shared/modules/primeng.module';
import { ListComponent } from './pages/list/list.component';
import { FormComponent } from './pages/form/form.component';


@NgModule({
  declarations: [
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AcademicTermsRoutingModule,
    PrimengModule
  ]
})
export class AcademicTermsModule { }
