import { Component, Input, OnInit } from '@angular/core';

import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DriverLicence } from '../../../models/driverLicence';
import { CaseService } from '../../../services/case.service';
import { DriverLicenceService } from '../../../services/driverLicense.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-driverLicenceUpdate',
  templateUrl: './driverLicenceUpdate.component.html',
  styleUrls: ['./driverLicenceUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class DriverLicenceUpdateComponent implements OnInit {
  updateForm: FormGroup;
  @Input() driverLicence: DriverLicence;
  driverLicenceId: number;

  componentTitle = 'Driver Licence Update Form';

  constructor(
    private driverLicenceService: DriverLicenceService,

    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private caseService: CaseService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.createUpdateForm();

    setTimeout(() => {
      this.getById(this.driverLicence.id);
    }, 200);
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      driverLicenceName: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  getById(id: number) {
    this.driverLicenceService.getById(id).subscribe(
      (response) => {
        this.updateForm.patchValue({
          driverLicenceName: response.data.driverLicenceName,
        });
        this.driverLicenceId = id;
      },
      (error) => console.error
    );
  }

  update() {
    if (this.updateForm.valid) {
      this.driverLicenceService.update(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/driverlicence/driverlicencelisttab',
          ]);
        },
        (error) => {
          console.error;
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): DriverLicence {
    return Object.assign({
      id: this.driverLicenceId,
      driverLicenceName: this.caseService.capitalizeToUpper(
        this.updateForm.value.driverLicenceName
      ),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  clearInput1() {
    let value = this.updateForm.get('driverLicenceName');
    value.reset();
  }
}
