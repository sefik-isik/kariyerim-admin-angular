import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DriverLicence } from '../../../models/driverLicence';
import { CaseService } from '../../../services/case.service';
import { DriverLicenceService } from '../../../services/driverLicense.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-driverLicenceAdd',
  templateUrl: './driverLicenceAdd.component.html',
  styleUrls: ['./driverLicenceAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class DriverLicenceAddComponent implements OnInit {
  addForm: FormGroup;

  componentTitle = 'Add Driver Licence Form';

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private driverLicenceService: DriverLicenceService,
    private caseService: CaseService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.createAddForm();
  }

  createAddForm() {
    this.addForm = this.formBuilder.group({
      driverLicenceName: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  add() {
    if (this.addForm.valid && this.getModel()) {
      this.driverLicenceService.add(this.getModel()).subscribe(
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
      driverLicenceName: this.caseService.capitalizeToUpper(
        this.addForm.value.driverLicenceName
      ),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  clearInput1() {
    let value = this.addForm.get('driverLicenceName');
    value.reset();
  }
}
