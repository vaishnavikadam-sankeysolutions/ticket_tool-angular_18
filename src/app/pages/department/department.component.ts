import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
  standalone: true,
  imports: [DatePipe, FormsModule, CommonModule]
})
export class DepartmentComponent implements OnInit {
  deptObj: any;

  isEditOn: boolean = false;

  isDisplayOn: boolean = false;

  constructor(private masterService: MasterService) { }

  newDepartment: any = {
    'deptName': '',
    'createdDate': ''
  };

  ngOnInit(): void {

  }

  getDataDisplay() {
    this.getDepartments();
    this.isDisplayOn = !this.isDisplayOn;
  }

  getDepartments(): void {
    this.masterService.getDepartments().subscribe(
      departments => {
        this.deptObj = departments;
        console.log(departments);
      },
      error => {
        console.error('Error fetching departments: ', error);
      }
    );
  }


  // For editing
  onEdit(data: any) {
    this.newDepartment = data;
    this.isEditOn = !this.isEditOn;

  }



  createDepartment(): void {
    this.masterService.createDepartments(this.newDepartment).subscribe((res: any) => {
      if (res) {
        alert("Data added successfully");
        this.getDepartments();
      } else {
        alert(res.message);
      }
    })
  }


  updateDepartments() {
    this.masterService.updateDepartments(this.newDepartment).subscribe((res: any) => {
      if (res) {
        alert("Data updated successfully");

      }
      else {
        alert(res.message);
      }
    })
  }


  deleteDepartment(id: string): void {
    if (confirm("Are you sure you want to delete this department?")) {
      this.masterService.deleteDepartment(id).subscribe((res: any) => {
        if (res) {
          alert("Data deleted successfully");
          this.getDepartments();
        } else {
          alert(res.message);
        }
      });
    }
  }


}
