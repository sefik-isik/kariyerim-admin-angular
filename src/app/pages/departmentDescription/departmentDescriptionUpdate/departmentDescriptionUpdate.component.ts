import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Department } from '../../../models/component/department';
import { DepartmentService } from '../../../services/department.service';
import { DepartmentDescriptionDTO } from '../../../models/dto/departmentDescriptionDTO';
import { DepartmentDescriptionService } from '../../../services/departmentDescription.service';
import { DepartmentDescription } from '../../../models/component/departmentDescription';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-departmentDescriptionUpdate',
  templateUrl: './departmentDescriptionUpdate.component.html',
  styleUrls: ['./departmentDescriptionUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class DepartmentDescriptionUpdateComponent implements OnInit {
  @Input() departmentDescriptionDTO: DepartmentDescriptionDTO;
  departmentDescriptionDTOs: DepartmentDescriptionDTO[];
  departments: Department[];
  descriptionCount: number;
  componentTitle = 'Department Description Update Form';

  constructor(
    private departmentDescriptionService: DepartmentDescriptionService,
    private toastrService: ToastrService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private departmentService: DepartmentService,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getDepartments();
    setTimeout(() => {
      this.getById(this.departmentDescriptionDTO.id);
    }, 200);
  }

  getById(id: string) {
    this.departmentDescriptionService.getById(id).subscribe(
      (response) => {
        this.departmentDescriptionDTO.id = response.data.id;
      },
      (responseError) => console.error
    );
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.departmentDescriptionService.update(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/departmentdescription/departmentdescriptionlisttab',
          ]);
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): DepartmentDescription {
    return Object.assign({
      id: this.departmentDescriptionDTO.id,
      departmentId: this.getDepartmentId(
        this.departmentDescriptionDTO.departmentName
      ),
      title: this.departmentDescriptionDTO.title,
      description: this.departmentDescriptionDTO.description,
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
      (responseError) => console.error
    );
  }

  getDepartmentById(departmentId: string): string {
    return this.departments.find((c) => c.id == departmentId)?.departmentName;
  }

  getDepartmentId(departmentName: string): string {
    const departmentId = this.departments.filter(
      (c) => c.departmentName === departmentName
    )[0]?.id;

    return departmentId;
  }

  countDescription() {
    this.descriptionCount = this.departmentDescriptionDTO.description.length;
  }

  departmentNameClear() {
    this.departmentDescriptionDTO.departmentName = '';
  }

  titleClear() {
    this.departmentDescriptionDTO.title = '';
  }

  descriptionClear() {
    this.departmentDescriptionDTO.description = '';
  }
}
