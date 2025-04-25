import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
import { DriverLicenceService } from '../../../services/driverLicense.service';
import { DriverLicence } from '../../../models/driverLicence';

@Component({
  selector: 'app-DriverLicenceUpdate',
  templateUrl: './DriverLicenceUpdate.component.html',
  styleUrls: ['./DriverLicenceUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class DriverLicenceUpdateComponent implements OnInit {
  uptadeForm: FormGroup;
  driverLicenceId: number;
  componentTitle = 'Driver Licence Update';

  constructor(
    private driverLicenceService: DriverLicenceService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createUpdateForm();
    this.activatedRoute.params.subscribe((params) => {
      this.getSectorById(params['driverlicenceId']);
    });
  }

  createUpdateForm() {
    this.uptadeForm = this.formBuilder.group({
      licenceName: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  getSectorById(id: number) {
    this.driverLicenceService.getById(id).subscribe(
      (response) => {
        this.uptadeForm.patchValue({
          licenceName: response.data.licenceName,
        });
        this.driverLicenceId = id;
      },
      (error) => console.error
    );
  }

  update() {
    if (this.uptadeForm.valid) {
      this.driverLicenceService.update(this.getModel()).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/driverlicences']);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): DriverLicence {
    return Object.assign({
      id: this.driverLicenceId,
      licenceName: this.capitalizeToUpper(this.uptadeForm.value.licenceName),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  capitalizeToUpper(str: string) {
    return str.toUpperCase();
  }

  clearInput1() {
    let value = this.uptadeForm.get('licenceName');
    value.reset();
  }
}
