import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DepartmentDescription } from '../../../models/component/departmentDescription';
import { DepartmentDescriptionDTO } from '../../../models/dto/departmentDescriptionDTO';
import { DepartmentDescriptionService } from '../../../services/departmentDescription.service';
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
  descriptionCount: number;
  componentTitle = 'Department Description Update Form';

  constructor(
    private departmentDescriptionService: DepartmentDescriptionService,
    private toastrService: ToastrService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {}

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.departmentDescriptionService.update(this.getModel()).subscribe(
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
      id: this.departmentDescriptionDTO.id,
      departmentId: this.departmentDescriptionDTO.departmentId,
      title: this.departmentDescriptionDTO.title.trim(),
      description: this.departmentDescriptionDTO.description.trim(),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  countDescription() {
    this.descriptionCount = this.departmentDescriptionDTO.description.length;
  }

  titleClear() {
    this.departmentDescriptionDTO.title = '';
  }

  descriptionClear() {
    this.departmentDescriptionDTO.description = '';
  }
}
