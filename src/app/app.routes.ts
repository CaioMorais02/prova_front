import { Routes } from '@angular/router';
import { EmployeeList } from './pages/employee-list/employee-list';
import { EmployeeForm } from './pages/employee-form/employee-form';

export const routes: Routes = [
    {path: '', redirectTo: 'employees', pathMatch: 'full'},
    {path: 'employees', component: EmployeeList},
    {path: 'employees/new', component: EmployeeForm},
    {path: 'employees/:id/edit', component: EmployeeForm}
];
