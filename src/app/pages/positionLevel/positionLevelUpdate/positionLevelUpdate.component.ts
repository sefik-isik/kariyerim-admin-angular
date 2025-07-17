import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Position } from '../../../models/component/position';
import { PositionService } from '../../../services/position.service';
import { ValidationService } from '../../../services/validation.service';
import { PositionLevel } from '../../../models/component/positionLevel';
import { PositionLevelService } from '../../../services/positionLevel.service';

@Component({
  selector: 'app-positionLevelUpdate',
  templateUrl: './positionLevelUpdate.component.html',
  styleUrls: ['./positionLevelUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PositionLevelUpdateComponent implements OnInit {
  @Input() positionLevel: PositionLevel;
  componentTitle = 'Position Level Update Form';

  constructor(
    private positionLevelService: PositionLevelService,
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
      this.positionLevelService.update(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/positionlevel/positionlevellisttab',
          ]);
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): PositionLevel {
    return Object.assign({
      id: this.positionLevel.id,
      positionLevelName: this.positionLevel.positionLevelName.trim(),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  positionLevelNameClear() {
    this.positionLevel.positionLevelName = '';
  }
}
