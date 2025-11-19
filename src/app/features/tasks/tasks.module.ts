import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { PrimengModule } from '../../shared/modules/primeng.module';
import { FormComponent } from './pages/form/form.component';
import { ListComponent } from './pages/list/list.component';
import { TasksRoutingModule } from './tasks-routing.module';


@NgModule({
  declarations: [
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TasksRoutingModule,
    PrimengModule
  ]
})
export class TasksModule { }
