import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UniversityDepartmentService } from '../../../services/universityDepartment.service';
import { UniversityDepartment } from '../../../models/component/universitydepartment';
import { UniversityDepartmentDescriptionService } from '../../../services/universityDepartmentDescription.service';
import { UniversityDepartmentDescription } from '../../../models/component/universityDepartmentDescription';
import { UniversityDepartmentDescriptionDTO } from '../../../models/dto/universityDepartmentDescriptionDTO';
import { ValidationService } from '../../../services/validation.service';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { angularEditorConfig } from '../../../models/concrete/angularEditorConfig';

@Component({
  selector: 'app-universityDepartmentDescriptionAdd',
  templateUrl: './universityDepartmentDescriptionAdd.component.html',
  styleUrls: ['./universityDepartmentDescriptionAdd.component.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AngularEditorModule,
  ],
})
export class UniversityDepartmentDescriptionAddComponent implements OnInit {
  universityDepartmentDescriptionModel: UniversityDepartmentDescriptionDTO =
    {} as UniversityDepartmentDescriptionDTO;
  editorCount: number = 0;
  universityDepartments: UniversityDepartment[];
  componentTitle = 'Department Description Add Form';

  htmlContent = '';
  config: AngularEditorConfig = angularEditorConfig;

  constructor(
    private universityDepartmentDescriptionService: UniversityDepartmentDescriptionService,
    private toastrService: ToastrService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private universityDepartmentService: UniversityDepartmentService,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getUniversityDepartments();
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.universityDepartmentDescriptionService
        .add(this.getModel())
        .subscribe(
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

  getModel(): UniversityDepartmentDescription {
    return Object.assign({
      id: '',
      departmentId: this.getUniversityDepartmentId(
        this.universityDepartmentDescriptionModel.universityDepartmentName.trim()
      ),
      title: this.universityDepartmentDescriptionModel.title.trim(),
      description: this.htmlContent,
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getUniversityDepartments() {
    this.universityDepartmentService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.universityDepartments = response.data.filter(
          (f) => f.departmentName != '-'
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getUniversityDepartmentId(universityDepartmentName: string): string {
    const universityDepartmentId = this.universityDepartments.filter(
      (c) => c.departmentName === universityDepartmentName
    )[0]?.id;

    return universityDepartmentId;
  }

  count() {
    this.editorCount = this.htmlContent.length;
  }

  universityDepartmentNameClear() {
    this.universityDepartmentDescriptionModel.universityDepartmentName = '';
  }

  titleClear() {
    this.universityDepartmentDescriptionModel.title = '';
  }

  descriptionClear() {
    this.universityDepartmentDescriptionModel.description = '';
  }
}
