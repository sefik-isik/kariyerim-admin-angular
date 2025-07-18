import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartmentService } from '../../../services/department.service';
import { Department } from '../../../models/component/department';
import { DepartmentDescriptionService } from '../../../services/departmentDescription.service';
import { DepartmentDescription } from '../../../models/component/departmentDescription';
import { DepartmentDescriptionDTO } from '../../../models/dto/departmentDescriptionDTO';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-departmentDescriptionAdd',
  templateUrl: './departmentDescriptionAdd.component.html',
  styleUrls: ['./departmentDescriptionAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class DepartmentDescriptionAddComponent implements OnInit {
  departmentDescriptionModel: DepartmentDescriptionDTO =
    {} as DepartmentDescriptionDTO;
  descriptionCount: number;
  departments: Department[];
  componentTitle = 'Department Description Add Form';

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
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.departmentDescriptionService.add(this.getModel()).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/departmentdescription/departmentdescriptionlisttab',
          ]);
        },
        (responseError) => {
          this.validationService.handleErrors(responseError);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): DepartmentDescription {
    return Object.assign({
      id: '',
      departmentId: this.getDepartmentId(
        this.departmentDescriptionModel.departmentName.trim()
      ),
      title: this.departmentDescriptionModel.title.trim(),
      description: this.departmentDescriptionModel.description.trim(),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getDepartments() {
    this.departmentService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.departments = response.data
          .filter((f) => f.isCompany == false)
          .filter((f) => f.departmentName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
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
    this.descriptionCount = this.departmentDescriptionModel.description.length;
  }

  departmentNameClear() {
    this.departmentDescriptionModel.departmentName = '';
  }

  titleClear() {
    this.departmentDescriptionModel.title = '';
  }

  descriptionClear() {
    this.departmentDescriptionModel.description = '';
  }
}
