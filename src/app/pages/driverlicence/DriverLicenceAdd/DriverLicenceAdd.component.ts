import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DriverLicence } from '../../../models/component/driverLicence';
import { CaseService } from '../../../services/helperServices/case.service';
import { DriverLicenceService } from '../../../services/driverLicense.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-driverLicenceAdd',
  templateUrl: './driverLicenceAdd.component.html',
  styleUrls: ['./driverLicenceAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class DriverLicenceAddComponent implements OnInit {
  driverLicence: DriverLicence = {} as DriverLicence;
  componentTitle = 'Driver Licence Add Form';

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private driverLicenceService: DriverLicenceService,
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
      this.driverLicenceService.add(this.getModel()).subscribe(
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
      id: '',
      driverLicenceName: this.caseService.capitalizeToUpper(
        this.driverLicence.driverLicenceName.trim()
      ),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  driverLicenceNameClear() {
    this.driverLicence.driverLicenceName = '';
  }
}
