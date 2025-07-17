import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CityService } from '../../../services/city.service';
import { ToastrService } from 'ngx-toastr';

import { RegionDTO } from '../../../models/dto/regionDTO';
import { City } from '../../../models/component/city';
import { RegionService } from '../../../services/region.service';
import { FilterRegionPipe } from '../../../pipes/filterRegion.pipe';
import { FilterRegionByCityPipe } from '../../../pipes/filterRegionByCity.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegionUpdateComponent } from '../regionUpdate/regionUpdate.component';
import { RegionDetailComponent } from '../regionDetail/regionDetail.component';

@Component({
  selector: 'app-regionDeletedList',
  templateUrl: './regionDeletedList.component.html',
  styleUrls: ['./regionDeletedList.component.css'],
  imports: [
    CommonModule,
    FormsModule,

    FilterRegionPipe,
    FilterRegionByCityPipe,
  ],
})
export class RegionDeletedListComponent implements OnInit {
  regionDTOs: RegionDTO[] = [];
  cities: City[];
  dataLoaded = false;
  filter1 = '';
  filter2 = '';

  componentTitle = 'Deleted Regions';
  constructor(
    private cityService: CityService,
    private toastrService: ToastrService,
    private regionService: RegionService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getCities();
    this.getRegions();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getRegions();
      }
    });
  }

  getCities() {
    this.cityService.getAll().subscribe(
      (response) => {
        this.cities = response.data.filter((f) => f.cityName != '-');
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getRegions() {
    this.regionService.getDeletedAllDTO().subscribe(
      (response) => {
        this.regionDTOs = response.data;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  unDelete(region: RegionDTO) {
    this.regionService.update(region).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  unDeleteAll() {
    this.regionDTOs.forEach((region) => {
      this.regionService.update(region).subscribe(
        (response) => {},
        (responseError) => this.toastrService.error(responseError.error.message)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  terminate(regionDTO: RegionDTO) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.regionService.terminate(regionDTO).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile kalıcı olarak silindi');
        this.ngOnInit();
      },
      (responseError) => console.log(responseError)
    );
  }

  terminateAll() {
    if (!confirm('Tümünü Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.regionDTOs.forEach((regionDTO) => {
      this.regionService.terminate(regionDTO).subscribe(
        (response) => {},
        (responseError) => this.toastrService.error(responseError.error.message)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
    }, 500);
  }

  open(regionDTO: RegionDTO) {
    const modalRef = this.modalService.open(RegionUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.regionDTO = regionDTO;
  }

  openDetail(regionDTO: RegionDTO) {
    const modalRef = this.modalService.open(RegionDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.regionDTO = regionDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.getRegions();
  }

  clearInput2() {
    this.filter2 = null;
    this.getCities();
  }
}
