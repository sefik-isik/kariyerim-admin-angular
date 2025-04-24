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
import { Router, RouterLink } from '@angular/router';
import { DriverLicenceService } from '../../../services/driverLicense.service';
import { DriverLicence } from '../../../models/driverLicence';

@Component({
  selector: 'app-DriverLicenceAdd',
  templateUrl: './DriverLicenceAdd.component.html',
  styleUrls: ['./DriverLicenceAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class DriverLicenceAddComponent implements OnInit {
  addForm: FormGroup;
  componentTitle = 'Add Driver Licence Form';

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private driverLicenceService: DriverLicenceService
  ) {}

  ngOnInit() {
    this.createAddForm();
  }

  createAddForm() {
    this.addForm = this.formBuilder.group({
      licenceName: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  add() {
    if (this.addForm.valid && this.getModel()) {
      this.driverLicenceService.add(this.getModel()).subscribe(
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
      licenceName: this.addForm.value.licenceName,
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  clearInput1() {
    let value = this.addForm.get('licenceName');
    value.reset();
  }
}
