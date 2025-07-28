import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PositionDescription } from '../../../models/component/positionDescription';
import { PositionDescriptionDTO } from '../../../models/dto/positionDescriptionDTO';
import { PositionDescriptionService } from '../../../services/positionDescription.service';
import { ValidationService } from '../../../services/validation.service';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { angularEditorConfig } from '../../../models/concrete/angularEditorConfig';

@Component({
  selector: 'app-positionDescriptionUpdate',
  templateUrl: './positionDescriptionUpdate.component.html',
  styleUrls: ['./positionDescriptionUpdate.component.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AngularEditorModule,
  ],
})
export class PositionDescriptionUpdateComponent implements OnInit {
  @Input() positionDescriptionDTO: PositionDescriptionDTO;
  positionDescriptionDTOs: PositionDescriptionDTO[];
  editorCount: number = 0;
  componentTitle = 'Department Description Update Form';

  htmlContent = '';
  config: AngularEditorConfig = angularEditorConfig;

  constructor(
    private positionDescriptionService: PositionDescriptionService,
    private toastrService: ToastrService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.htmlContent = this.positionDescriptionDTO.description;
    this.editorCount = this.htmlContent.length;
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.positionDescriptionService.update(this.getModel()).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/positiondescription/positiondescriptionlisttab',
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

  getModel(): PositionDescription {
    return Object.assign({
      id: this.positionDescriptionDTO.id,
      positionId: this.positionDescriptionDTO.positionId,
      title: this.positionDescriptionDTO.title.trim(),
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
    this.positionDescriptionDTO.title = '';
  }

  descriptionClear() {
    this.htmlContent = '';
  }
}
