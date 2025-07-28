import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { University } from '../../../models/component/university';
import { UniversityDescription } from '../../../models/component/universityDescription';
import { UniversityDescriptionDTO } from '../../../models/dto/universityDescriptionDTO';
import { UniversityService } from '../../../services/university.service';
import { UniversityDescriptionService } from '../../../services/universityDescription.service';
import { ValidationService } from '../../../services/validation.service';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { angularEditorConfig } from '../../../models/concrete/angularEditorConfig';

@Component({
  selector: 'app-universityDescriptionAdd',
  templateUrl: './universityDescriptionAdd.component.html',
  styleUrls: ['./universityDescriptionAdd.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AngularEditorModule,
  ],
})
export class UniversityDescriptionAddComponent implements OnInit {
  universityDescriptionModel: UniversityDescriptionDTO =
    {} as UniversityDescriptionDTO;
  editorCount: number = 0;
  universities: University[];
  componentTitle = 'University Description Add Form';

  htmlContent = '';
  config: AngularEditorConfig = angularEditorConfig;

  constructor(
    private universityDescriptionService: UniversityDescriptionService,
    private toastrService: ToastrService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private universityService: UniversityService,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getUniversities();
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.universityDescriptionService.add(this.getModel()).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          //this.activeModal.close();
          this.htmlContent = '';
          this.titleClear();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/universitydescription/universitydescriptionlisttab',
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

  getModel(): UniversityDescription {
    return Object.assign({
      id: '',
      universityId: this.getUniversityId(
        this.universityDescriptionModel.universityName.trim()
      ),
      title: this.universityDescriptionModel.title.trim(),
      description: this.htmlContent,
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getUniversities() {
    this.universityService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.universities = response.data.filter(
          (f) => f.universityName != '-'
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getUniversityId(universityName: string): string {
    const universityId = this.universities.filter(
      (c) => c.universityName === universityName
    )[0]?.id;

    return universityId;
  }

  count() {
    this.editorCount = this.htmlContent.length;
  }

  universityNameClear() {
    this.universityDescriptionModel.universityName = '';
  }

  titleClear() {
    this.universityDescriptionModel.title = '';
  }

  descriptionClear() {
    this.htmlContent = '';
  }
}
