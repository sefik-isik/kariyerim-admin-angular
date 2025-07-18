import { Component, Input, OnInit } from '@angular/core';

import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DriverLicence } from '../../../models/component/driverLicence';
import { CaseService } from '../../../services/helperServices/case.service';
import { DriverLicenceService } from '../../../services/driverLicense.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-driverLicenceUpdate',
  templateUrl: './driverLicenceUpdate.component.html',
  styleUrls: ['./driverLicenceUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class DriverLicenceUpdateComponent implements OnInit {
  @Input() driverLicence: DriverLicence;
  driverLicenceId: string;

  componentTitle = 'Driver Licence Update Form';

  constructor(
    private driverLicenceService: DriverLicenceService,
    private toastrService: ToastrService,
    private router: Router,
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
      this.driverLicenceService.update(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/driverlicence/driverlicencelisttab',
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

  getModel(): DriverLicence {
    return Object.assign({
      id: this.driverLicence.id,
      driverLicenceName: this.caseService.capitalizeToUpper(
        this.driverLicence.driverLicenceName.trim()
      ),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  driverLicenceNameClear() {
    this.driverLicence.driverLicenceName = '';
  }
}
