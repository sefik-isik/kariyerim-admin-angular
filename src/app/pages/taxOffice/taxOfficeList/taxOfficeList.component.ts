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
    private modalService: NgbModal
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
  getTaxOffices() {
    this.taxOfficeService.getAllDTO().subscribe(
      (response) => {
        this.taxOfficeDTOs = response.data.filter(
          (f) => f.taxOfficeName != '-'
        );
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }
  getCities() {
    this.cityService.getAll().subscribe(
      (response) => {
        this.cities = response.data.filter((f) => f.cityName != '-');
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  delete(taxOfficeDTO: TaxOfficeDTO) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.taxOfficeService.delete(taxOfficeDTO).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile silindi');
        this.ngOnInit();
      },
      (responseError) => this.toastrService.error(responseError.error.message)
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
        (response) => {},
        (responseError) => this.toastrService.error(responseError.error.message)
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
