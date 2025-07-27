import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UniversityDepartmentDescription } from '../../../models/component/universityDepartmentDescription';
import { UniversityDepartmentDescriptionDTO } from '../../../models/dto/universityDepartmentDescriptionDTO';
import { UniversityDepartmentDescriptionService } from '../../../services/universityDepartmentDescription.service';
import { ValidationService } from '../../../services/validation.service';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { angularEditorConfig } from '../../../models/concrete/angularEditorConfig';

@Component({
  selector: 'app-universityDepartmentDescriptionUpdate',
  templateUrl: './universityDepartmentDescriptionUpdate.component.html',
  styleUrls: ['./universityDepartmentDescriptionUpdate.component.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AngularEditorModule,
  ],
})
export class UniversityDepartmentDescriptionUpdateComponent implements OnInit {
  @Input()
  universityDepartmentDescriptionDTO: UniversityDepartmentDescriptionDTO;
  universityDepartmentDescriptionDTOs: UniversityDepartmentDescriptionDTO[];
  editorCount: number = 0;
  componentTitle = 'Department Description Update Form';

  htmlContent = '';
  config: AngularEditorConfig = angularEditorConfig;

  constructor(
    private universityDepartmentDescriptionService: UniversityDepartmentDescriptionService,
    private toastrService: ToastrService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.htmlContent = this.universityDepartmentDescriptionDTO.description;
    this.editorCount = this.htmlContent.length;
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.universityDepartmentDescriptionService
        .update(this.getModel())
        .subscribe(
          (response) => {
            this.validationService.handleSuccesses(response);
            this.activeModal.close();
            this.toastrService.success(response.message, 'Başarılı');
            this.router.navigate([
              '/dashboard/universitydepartmentdescription/universitydepartmentdescriptionlisttab',
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

  getModel(): UniversityDepartmentDescription {
    return Object.assign({
      id: this.universityDepartmentDescriptionDTO.id,
      departmentId:
        this.universityDepartmentDescriptionDTO.universityDepartmentId,
      title: this.universityDepartmentDescriptionDTO.title.trim(),
      description: this.htmlContent,
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  count() {
    this.editorCount = this.htmlContent.length;
  }

  titleClear() {
    this.universityDepartmentDescriptionDTO.title = '';
  }

  descriptionClear() {
    this.universityDepartmentDescriptionDTO.description = '';
  }
}
