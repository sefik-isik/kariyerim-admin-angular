import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UniversityDescription } from '../../../models/component/universityDescription';
import { UniversityDescriptionDTO } from '../../../models/dto/universityDescriptionDTO';
import { UniversityDescriptionService } from '../../../services/universityDescription.service';
import { ValidationService } from '../../../services/validation.service';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { angularEditorConfig } from '../../../models/concrete/angularEditorConfig';

@Component({
  selector: 'app-universityDescriptionUpdate',
  templateUrl: './universityDescriptionUpdate.component.html',
  styleUrls: ['./universityDescriptionUpdate.component.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AngularEditorModule,
  ],
})
export class UniversityDescriptionUpdateComponent implements OnInit {
  @Input() universityDescriptionDTO: UniversityDescriptionDTO;
  universityDescriptionDTOs: UniversityDescriptionDTO[];
  editorCount: number = 0;
  componentTitle = 'University Description Update Form';

  htmlContent = '';
  config: AngularEditorConfig = angularEditorConfig;

  constructor(
    private universityDescriptionService: UniversityDescriptionService,
    private toastrService: ToastrService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.htmlContent = this.universityDescriptionDTO.description;
    this.editorCount = this.htmlContent.length;
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.universityDescriptionService.update(this.getModel()).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.activeModal.close();
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
      id: this.universityDescriptionDTO.id,
      universityId: this.universityDescriptionDTO.universityId,
      title: this.universityDescriptionDTO.title.trim(),
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
    this.universityDescriptionDTO.title = '';
  }

  descriptionClear() {
    this.universityDescriptionDTO.description = '';
  }
}
