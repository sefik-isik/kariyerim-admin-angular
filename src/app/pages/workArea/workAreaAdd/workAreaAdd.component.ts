import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { WorkArea } from '../../../models/component/workArea';
import { ValidationService } from '../../../services/validation.service';
import { WorkAreaService } from '../../../services/workArea.service';

@Component({
  selector: 'app-workAreaAdd',
  templateUrl: './workAreaAdd.component.html',
  styleUrls: ['./workAreaAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class WorkAreaAddComponent implements OnInit {
  workAreaModel: WorkArea = {} as WorkArea;
  componentTitle = 'WorkArea Add Form';

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private workAreaService: WorkAreaService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {}

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.workAreaService.add(this.getModel()).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/workarea/workarealisttab']);
        },
        (responseError) => {
          this.validationService.handleErrors(responseError);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): WorkArea {
    return Object.assign({
      id: '',
      areaName: this.workAreaModel.areaName.trim(),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  areaNameClear() {
    this.workAreaModel.areaName = '';
  }
}
