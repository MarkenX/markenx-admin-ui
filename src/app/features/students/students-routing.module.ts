import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BulkImportComponent } from './pages/bulk-import/bulk-import.component';
import { FormComponent } from './pages/form/form.component';
import { ListComponent } from './pages/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'new',
    component: FormComponent
  },
  {
    path: 'edit/:id',
    component: FormComponent
  },
  {
    path: 'bulk-import',
    component: BulkImportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
