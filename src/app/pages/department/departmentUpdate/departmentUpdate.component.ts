import { Component, Input, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UniversityDepartment } from '../../../models/universityDepartment';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Department } from '../../../models/department';
import { DepartmentService } from '../../../services/department.service';

@Component({
  selector: 'app-departmentUpdate',
  templateUrl: './departmentUpdate.component.html',
  styleUrls: ['./departmentUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class DepartmentUpdateComponent implements OnInit {
  updateForm: FormGroup;
  @Input() department: Department;
  departments: Department[];
  departmentId: number;
  componentTitle = 'Department Update Form';

  constructor(
    private departmentService: DepartmentService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.createUpdateForm();

    setTimeout(() => {
      this.getById(this.department.id);
    }, 200);
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      departmentName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  getById(id: number) {
    this.departmentService.getById(id).subscribe(
      (response) => {
        this.updateForm.patchValue({
          departmentName: response.data.departmentName,
        });
        this.departmentId = response.data.id;
      },
      (error) => console.error
    );
  }

  update() {
    if (this.updateForm.valid) {
      this.departmentService.update(this.getModel()).subscribe(
        (response) => {
          console.log(response);
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/department/departmentlisttab']);
        },
        (error) => {
          this.toastrService.error(error.error.message);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): Department {
    return Object.assign({
      id: this.departmentId,
      departmentName: this.updateForm.value.departmentName,
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  clearInput1() {
    let value = this.updateForm.get('departmentName');
    value.reset();
  }
}
