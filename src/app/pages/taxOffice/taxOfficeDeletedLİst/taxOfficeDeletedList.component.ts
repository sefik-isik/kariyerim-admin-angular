import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CityService } from '../../../services/city.service';
import { ToastrService } from 'ngx-toastr';

import { City } from '../../../models/component/city';
import { TaxOfficeDTO } from '../../../models/dto/taxOfficeDTO';
import { TaxOfficeService } from '../../../services/taxOffice.service';
import { FilterTaxOfficePipe } from '../../../pipes/filterTaxOffice.pipe';
import { FilterTaxOfficeByCityPipe } from '../../../pipes/filterTaxOfficeByCity.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaxOfficeUpdateComponent } from '../taxOfficeUpdate/taxOfficeUpdate.component';
import { TaxOfficeDetailComponent } from '../taxOfficeDetail/taxOfficeDetail.component';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-taxOfficeDeletedList',
  templateUrl: './taxOfficeDeletedList.component.html',
  styleUrls: ['./taxOfficeDeletedList.component.css'],
  imports: [
    CommonModule,
    FormsModule,

    FilterTaxOfficePipe,
    FilterTaxOfficeByCityPipe,
  ],
})
export class TaxOfficeDeletedListComponent implements OnInit {
  taxOfficeDTOs: TaxOfficeDTO[] = [];
  cities: City[] = [];
  filter1 = '';
  filter2 = '';

  componentTitle = 'Deleted Tax Offices';
  constructor(
    private cityService: CityService,
    private toastrService: ToastrService,
    private taxOfficeService: TaxOfficeService,
    private modalService: NgbModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getCities();
    this.getTaxOffices();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getTaxOffices();
      }
    });
  }

  getCities() {
    this.cityService.getDeletedAllDTO().subscribe(
      (response) => {
        this.cities = response.data.filter((f) => f.cityName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getTaxOffices() {
    this.taxOfficeService.getDeletedAllDTO().subscribe(
      (response) => {
        this.taxOfficeDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDelete(taxOffice: TaxOfficeDTO) {
    this.taxOfficeService.update(taxOffice).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDeleteAll() {
    this.taxOfficeDTOs.forEach((taxOfficeDTO) => {
      this.taxOfficeService.update(taxOfficeDTO).subscribe(
        (response) => {},
        (responseError) => this.validationService.handleErrors(responseError)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  terminate(taxOfficeDTO: TaxOfficeDTO) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.taxOfficeService.terminate(taxOfficeDTO).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile kalıcı olarak silindi');
        this.ngOnInit();
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  terminateAll() {
    if (!confirm('Tümünü Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.taxOfficeDTOs.forEach((taxOfficeDTO) => {
      this.taxOfficeService.terminate(taxOfficeDTO).subscribe(
        (response) => {},
        (responseError) => this.validationService.handleErrors(responseError)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
    }, 500);
  }

  open(taxOfficeDTO: TaxOfficeDTO) {
    const modalRef = this.modalService.open(TaxOfficeUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.taxOfficeDTO = taxOfficeDTO;
  }

  openDetail(taxOfficeDTO: TaxOfficeDTO) {
    const modalRef = this.modalService.open(TaxOfficeDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.taxOfficeDTO = taxOfficeDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.getTaxOffices();
  }

  clearInput2() {
    this.filter2 = null;
    this.getCities();
  }
}
