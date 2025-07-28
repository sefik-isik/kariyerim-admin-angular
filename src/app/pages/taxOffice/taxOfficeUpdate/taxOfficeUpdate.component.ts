import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TaxOffice } from '../../../models/component/taxOffice';
import { TaxOfficeDTO } from '../../../models/dto/taxOfficeDTO';
import { ValidationService } from '../../../services/validation.service';
import { TaxOfficeService } from './../../../services/taxOffice.service';

@Component({
  selector: 'app-taxOfficeUpdate',
  templateUrl: './taxOfficeUpdate.component.html',
  styleUrls: ['./taxOfficeUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class TaxOfficeUpdateComponent implements OnInit {
  @Input() taxOfficeDTO: TaxOfficeDTO;
  componentTitle = 'Tax Office Update Form';

  constructor(
    private taxOfficeService: TaxOfficeService,
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
      this.taxOfficeService.update(this.getModel()).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/taxoffice/taxofficelisttab']);
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): TaxOffice {
    return Object.assign({
      id: this.taxOfficeDTO.id,
      cityId: this.taxOfficeDTO.cityId,
      regionName: this.taxOfficeDTO.regionName.trim(),
      taxOfficeCode: this.taxOfficeDTO.taxOfficeCode.trim(),
      taxOfficeName: this.taxOfficeDTO.taxOfficeName.trim(),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  taxOfficeCodeClear() {
    this.taxOfficeDTO.taxOfficeCode = '';
  }

  taxOfficeNameClear() {
    this.taxOfficeDTO.taxOfficeName = '';
  }
}
