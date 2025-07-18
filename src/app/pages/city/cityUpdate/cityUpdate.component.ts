import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { City } from '../../../models/component/city';
import { CityDTO } from '../../../models/dto/cityDTO';
import { CityService } from '../../../services/city.service';
import { CaseService } from '../../../services/helperServices/case.service';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-cityUpdate',
  templateUrl: './cityUpdate.component.html',
  styleUrls: ['./cityUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class CityUpdateComponent implements OnInit {
  @Input() cityDTO: CityDTO;
  cities: City[];
  componentTitle = 'City Update Form';

  constructor(
    private cityService: CityService,
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
      this.cityService.update(this.getModel()).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');

          this.router.navigate(['dashboard/city/citylisttab']);
          this.activeModal.close();
        },
        (responseError) => {
          this.validationService.handleErrors(responseError);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): City {
    return Object.assign({
      id: this.cityDTO.id,
      countryId: this.cityDTO.countryId,
      cityName: this.caseService.capitalizeFirstLetter(
        this.cityDTO.cityName.trim()
      ),
      cityCode: this.cityDTO.cityCode.trim(),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  cityNameClear() {
    this.cityDTO.cityName = '';
  }

  cityCodeClear() {
    this.cityDTO.cityCode = '';
  }
}
