import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Position } from '../../../models/component/position';
import { PositionService } from '../../../services/position.service';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-positionAdd',
  templateUrl: './positionAdd.component.html',
  styleUrls: ['./positionAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PositionAddComponent implements OnInit {
  positionModel: Position = {} as Position;
  componentTitle = 'Position Add Form';

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private positionService: PositionService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {}

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.positionService.add(this.getModel()).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          //this.activeModal.close();
          this.positionNameClear();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/position/positionlisttab']);
        },
        (responseError) => {
          this.validationService.handleErrors(responseError);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): Position {
    return Object.assign({
      id: '',
      positionName: this.positionModel.positionName.trim(),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  positionNameClear() {
    this.positionModel.positionName = '';
  }
}
