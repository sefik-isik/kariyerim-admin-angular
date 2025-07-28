import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Position } from '../../../models/component/position';
import { PositionDescription } from '../../../models/component/positionDescription';
import { PositionDescriptionDTO } from '../../../models/dto/positionDescriptionDTO';
import { PositionService } from '../../../services/position.service';
import { PositionDescriptionService } from '../../../services/positionDescription.service';
import { ValidationService } from '../../../services/validation.service';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { angularEditorConfig } from '../../../models/concrete/angularEditorConfig';

@Component({
  selector: 'app-positionDescriptionAdd',
  templateUrl: './positionDescriptionAdd.component.html',
  styleUrls: ['./positionDescriptionAdd.component.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AngularEditorModule,
  ],
})
export class PositionDescriptionAddComponent implements OnInit {
  positionDescriptionModel: PositionDescriptionDTO =
    {} as PositionDescriptionDTO;
  editorCount: number = 0;
  positions: Position[];
  componentTitle = 'Position Description Add Form';

  htmlContent = '';
  config: AngularEditorConfig = angularEditorConfig;

  constructor(
    private positionDescriptionService: PositionDescriptionService,
    private toastrService: ToastrService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private positionService: PositionService,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getPositions();
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.positionDescriptionService.add(this.getModel()).subscribe(
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
      id: '',
      positionId: this.getPositionId(
        this.positionDescriptionModel.positionName.trim()
      ),
      title: this.positionDescriptionModel.title.trim(),
      description: this.htmlContent,
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getPositions() {
    this.positionService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.positions = response.data.filter((f) => f.positionName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getPositionId(positionName: string): string {
    const departmentId = this.positions.filter(
      (c) => c.positionName === positionName
    )[0]?.id;

    return departmentId;
  }

  count() {
    this.editorCount = this.htmlContent.length;
  }

  positionNameClear() {
    this.positionDescriptionModel.positionName = '';
  }

  titleClear() {
    this.positionDescriptionModel.title = '';
  }

  descriptionClear() {
    this.htmlContent = '';
  }
}
