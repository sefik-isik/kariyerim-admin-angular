import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CityService } from '../../../services/city.service';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { City } from '../../../models/component/city';
import { TaxOfficeService } from '../../../services/taxOffice.service';
import { TaxOfficeDTO } from '../../../models/dto/taxOfficeDTO';
import { FilterTaxOfficePipe } from '../../../pipes/filterTaxOffice.pipe';
import { FilterTaxOfficeByCityPipe } from '../../../pipes/filterTaxOfficeByCity.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaxOfficeUpdateComponent } from '../taxOfficeUpdate/taxOfficeUpdate.component';
import { TaxOfficeDetailComponent } from '../taxOfficeDetail/taxOfficeDetail.component';
import { ValidationService } from '../../../services/validation.service';
import { TaxOffice } from '../../../models/component/taxOffice';
import { TaxOfficeJsonData } from '../../../models/taxOfficeJsonData';

@Component({
  selector: 'app-taxOfficeList',
  templateUrl: './taxOfficeList.component.html',
  styleUrls: ['./taxOfficeList.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    FilterTaxOfficePipe,
    FilterTaxOfficeByCityPipe,
  ],
})
export class TaxOfficeListComponent implements OnInit {
  taxOfficeDTOs: TaxOfficeDTO[] = [];
  cities: City[] = [];
  filter1 = '';
  filter2 = '';
  admin: boolean = false;
  componentTitle = 'Tax Offices';
  constructor(
    private cityService: CityService,
    private toastrService: ToastrService,
    private taxOfficeService: TaxOfficeService,
    private authService: AuthService,
    private modalService: NgbModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getCities();
    this.getTaxOffices();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getTaxOffices();
      }
    });
  }

  updateAll() {
    if (!confirm('Tüm Dataları Resetlemek istediğinize emin misiniz?')) {
      this.toastrService.info('Resetleme İşlemi İptal Edildi');
      return;
    }
    TaxOfficeJsonData.data.forEach((taxOffice: TaxOffice) => {
      this.taxOfficeService
        .update(
          Object.assign({
            id: taxOffice.id,
            cityId: taxOffice.cityId,
            regionName: taxOffice.regionName.trim(),
            taxOfficeCode: taxOffice.taxOfficeCode.trim(),
            taxOfficeName: taxOffice.taxOfficeName.trim(),
            createdDate: new Date(Date.now()).toJSON(),
            updatedDate: new Date(Date.now()).toJSON(),
            deletedDate: new Date(Date.now()).toJSON(),
          })
        )
        .subscribe(
          (response) => {},
          (responseError) => this.validationService.handleErrors(responseError)
        );
    });
  }

  getTaxOffices() {
    this.taxOfficeService.getAllDTO().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.taxOfficeDTOs = response.data.filter(
          (f) => f.taxOfficeName != '-'
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }
  getCities() {
    this.cityService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.cities = response.data.filter((f) => f.cityName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  delete(taxOfficeDTO: TaxOfficeDTO) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.taxOfficeService.delete(taxOfficeDTO).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.toastrService.success('Başarı ile silindi');
        this.ngOnInit();
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  deleteAll() {
    // if (!this.authService.isAdmin()) {
    //   this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
    //   return;
    // }
    if (!confirm('Tümünü Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.taxOfficeDTOs.forEach((taxOfficeDTO) => {
      this.taxOfficeService.delete(taxOfficeDTO).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
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
    this.getCities();
  }

  clearInput2() {
    this.filter2 = null;
    this.getTaxOffices();
  }
}
