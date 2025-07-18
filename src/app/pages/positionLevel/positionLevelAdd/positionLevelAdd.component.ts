import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PositionLevel } from '../../../models/component/positionLevel';
import { CaseService } from '../../../services/helperServices/case.service';
import { PositionLevelService } from '../../../services/positionLevel.service';
import { ValidationService } from '../../../services/validation.service';
@Component({
  selector: 'app-positionLevelAdd',
  templateUrl: './positionLevelAdd.component.html',
  styleUrls: ['./positionLevelAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PositionLevelAddComponent implements OnInit {
  positionLevelModel: PositionLevel = {} as PositionLevel;
  componentTitle = 'PositionLevel Add Form';

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private positionLevelService: PositionLevelService,
    private caseService: CaseService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {}

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.positionLevelService.add(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/positionlevel/positionlevellisttab',
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

  getModel(): PositionLevel {
    return Object.assign({
      id: '',
      positionLevelName: this.caseService.capitalizeFirstLetter(
        this.positionLevelModel.positionLevelName.trim()
      ),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  positionLevelNameClear() {
    this.positionLevelModel.positionLevelName = '';
  }
}
