import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.scss',
})
export class EmployeeForm implements OnInit {
  private fb = inject(FormBuilder);
  private employeeService = inject(EmployeeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form: FormGroup;
  isEditMode = false;
  employeeId: number | null = null;

  constructor() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      active: [true]
    });
  }

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      console.log('ID na URL:', id);
      if (id) {
        this.isEditMode = true;
        this.employeeId = Number(id);
        this.employeeService.getEmployeeById(this.employeeId).subscribe({
          next: (employee) => {
            console.log('Dados carregados:', employee);
            this.form.patchValue(employee);
        },
          error: (err) => console.error('Erro ao carregar funcionário:', err)
        });
      }
  }

  onSubmit() {
    if (this.form.invalid) return;

    const employeeData = {
      ...this.form.value,
      id: this.employeeId ? this.employeeId : undefined
    };

    console.log('Enviando dados:', employeeData);

    if (this.isEditMode && this.employeeId) {
      this.employeeService.updateEmployee(this.employeeId, employeeData).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    } else {
      this.employeeService.createEmployee(employeeData).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    }
  }
}
