import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SectorDescription } from '../../../models/component/sectorDescription';
import { SectorDescriptionDTO } from '../../../models/dto/sectorDescriptionDTO';
import { SectorDescriptionService } from '../../../services/sectorDescription.service';
import { ValidationService } from '../../../services/validation.service';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { angularEditorConfig } from '../../../models/concrete/angularEditorConfig';

@Component({
  selector: 'app-sectorDescriptionUpdate',
  templateUrl: './sectorDescriptionUpdate.component.html',
  styleUrls: ['./sectorDescriptionUpdate.component.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AngularEditorModule,
  ],
})
export class SectorDescriptionUpdateComponent implements OnInit {
  @Input() sectorDescriptionDTO: SectorDescriptionDTO;
  sectorDescriptionDTOs: SectorDescriptionDTO[];
  editorCount: number = 0;
  componentTitle = 'Department Description Update Form';

  htmlContent = '';
  config: AngularEditorConfig = angularEditorConfig;

  constructor(
    private sectorDescriptionService: SectorDescriptionService,
    private toastrService: ToastrService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.htmlContent = this.sectorDescriptionDTO.description;
    this.editorCount = this.htmlContent.length;
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.sectorDescriptionService.update(this.getModel()).subscribe(
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

  getModel(): SectorDescription {
    return Object.assign({
      id: this.sectorDescriptionDTO.id,
      sectorId: this.sectorDescriptionDTO.sectorId,
      title: this.sectorDescriptionDTO.title.trim(),
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
    this.sectorDescriptionDTO.title = '';
  }

  descriptionClear() {
    this.htmlContent = '';
  }
}
