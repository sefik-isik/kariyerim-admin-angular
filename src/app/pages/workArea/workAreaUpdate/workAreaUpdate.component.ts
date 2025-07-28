import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { WorkArea } from '../../../models/component/workArea';
import { ValidationService } from '../../../services/validation.service';
import { WorkAreaService } from '../../../services/workArea.service';

@Component({
  selector: 'app-workAreaUpdate',
  templateUrl: './workAreaUpdate.component.html',
  styleUrls: ['./workAreaUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class WorkAreaUpdateComponent implements OnInit {
  @Input() workArea: WorkArea;
  componentTitle = 'WorkArea Update Form';

  constructor(
    private workAreaService: WorkAreaService,
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
      this.workAreaService.update(this.getModel()).subscribe(
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
      id: this.workArea.id,
      areaName: this.workArea.areaName.trim(),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  areaNameClear() {
    this.workArea.areaName = '';
  }
}
