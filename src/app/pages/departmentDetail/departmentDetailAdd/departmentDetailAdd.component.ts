import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartmentDetailService } from '../../../services/departmentDetail.service';
import { DepartmentDetail } from '../../../models/departmentDetail';
import { DepartmentService } from '../../../services/department.service';
import { Department } from '../../../models/department';

@Component({
  selector: 'app-departmentDetailAdd',
  templateUrl: './departmentDetailAdd.component.html',
  styleUrls: ['./departmentDetailAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class DepartmentDetailAddComponent implements OnInit {
  addForm: FormGroup;
  descriptionDetail: string;
  departments: Department[];
  componentTitle = 'Department Add Form';

  constructor(
    private formBuilder: FormBuilder,
    private departmentDetailService: DepartmentDetailService,
    private toastrService: ToastrService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private departmentService: DepartmentService
  ) {}

  ngOnInit() {
    this.createAddForm();
    this.getDepartments();
  }

  createAddForm() {
    this.addForm = this.formBuilder.group({
      departmentName: ['', [Validators.required, Validators.minLength(3)]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(50)]],
    });
  }

  add() {
    if (this.addForm.valid) {
      this.departmentDetailService.add(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/departmentdetail/departmentdetaillisttab',
          ]);
        },
        (error) => {
          this.toastrService.error(error.error.message);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): DepartmentDetail {
    return Object.assign({
      departmentId: this.getDepartmentId(this.addForm.value.departmentName),
      title: this.addForm.value.title,
      description: this.addForm.value.description,
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getDepartments() {
    this.departmentService.getAll().subscribe(
      (response) => {
        this.departments = response.data;
      },
      (error) => console.error
    );
  }

  getDepartmentById(departmentId: number): string {
    return this.departments.find((c) => c.id == departmentId)?.departmentName;
  }

  getDepartmentId(departmentName: string): number {
    const departmentId = this.departments.filter(
      (c) => c.departmentName === departmentName
    )[0]?.id;

    return departmentId;
  }

  countDescription() {
    this.descriptionDetail = this.addForm.value.description.length;
  }

  clearInput1() {
    let value = this.addForm.get('departmentName');
    value.reset();
  }

  clearInput2() {
    let value = this.addForm.get('title');
    value.reset();
  }

  clearInput3() {
    let value = this.addForm.get('description');
    value.reset();
  }
}
