import { Component, inject, signal, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee';
import { Employee } from '../../models/employee';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss',
})
export class EmployeeList implements OnInit {
  private employeeService = inject(EmployeeService);

  employees = signal<Employee[]>([]);

  ngOnInit(): void {
      this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees.set(data);
    });
  }

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    const valor = target.value.toLowerCase();

    console.log('Buscando por:', valor);

    if (!valor) {
      this.loadEmployees();
    } else {
      this.employeeService.searchEmployees(valor).subscribe(data => {
        const filtrados = data.filter(e => 
          e.name.toLowerCase().includes(valor) ||
          e.email.toLowerCase().includes(valor)
        );
        this.employees.set(filtrados);
      });
    }
  }

  onDelete(id: number) {
    if (confirm('Tem certeza que deseja apagar?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.loadEmployees();
      });
    }
  }
}
