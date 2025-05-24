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
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Department } from '../../../models/department';
import { DepartmentService } from '../../../services/department.service';
import { DepartmentDetailDTO } from '../../../models/departmentDetailDTO';
import { DepartmentDetailService } from '../../../services/departmentDetail.service';
import { DepartmentDetail } from '../../../models/departmentDetail';

@Component({
  selector: 'app-departmentDetailUpdate',
  templateUrl: './departmentDetailUpdate.component.html',
  styleUrls: ['./departmentDetailUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class DepartmentDetailUpdateComponent implements OnInit {
  updateForm: FormGroup;
  @Input() departmentDetailDTO: DepartmentDetailDTO;
  departmentDetailDTOs: DepartmentDetailDTO[];
  departmentDetailId: number;
  departmentId: number;
  departments: Department[];
  descriptionDetail: string;
  componentTitle = 'Department Detail Update Form';

  constructor(
    private departmentDetailService: DepartmentDetailService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private departmentService: DepartmentService
  ) {}

  ngOnInit() {
    this.createUpdateForm();
    this.getDepartments();
    setTimeout(() => {
      this.getById(this.departmentDetailDTO.id);
    }, 200);
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      departmentName: ['', [Validators.required, Validators.minLength(3)]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(50)]],
    });
  }

  getById(id: number) {
    this.departmentDetailService.getById(id).subscribe(
      (response) => {
        this.departmentId = response.data.departmentId;
        this.updateForm.patchValue({
          departmentName: this.getDepartmentById(this.departmentId),
          title: response.data.title,
          description: response.data.description,
        });
        this.departmentDetailId = response.data.id;
      },
      (error) => console.error
    );
  }

  update() {
    if (this.updateForm.valid) {
      this.departmentDetailService.update(this.getModel()).subscribe(
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
      id: this.departmentDetailId,
      departmentId: this.getDepartmentId(this.updateForm.value.departmentName),
      title: this.updateForm.value.title,
      description: this.updateForm.value.description,
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
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
    this.descriptionDetail = this.updateForm.value.description.length;
  }

  clearInput1() {
    let value = this.updateForm.get('departmentName');
    value.reset();
  }

  clearInput2() {
    let value = this.updateForm.get('title');
    value.reset();
  }

  clearInput3() {
    let value = this.updateForm.get('description');
    value.reset();
  }
}
