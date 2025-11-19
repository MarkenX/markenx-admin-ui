import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { PrimengModule } from '../../shared/modules/primeng.module';
import { AcademicTermsRoutingModule } from './academic-terms-routing.module';
import { FormComponent } from './pages/form/form.component';
import { ListComponent } from './pages/list/list.component';


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
