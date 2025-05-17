import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CityService } from '../../../services/city.service';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { RegionDTO } from '../../../models/regionDTO';
import { City } from '../../../models/city';
import { RegionService } from '../../../services/region.service';
import { FilterRegionPipe } from '../../../pipes/filterRegion.pipe';
import { FilterRegionByCityPipe } from '../../../pipes/filterRegionByCity.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegionUpdateComponent } from '../regionUpdate/regionUpdate.component';
import { RegionDetailComponent } from '../regionDetail/regionDetail.component';

@Component({
  selector: 'app-regionList',
  templateUrl: './regionList.component.html',
  styleUrls: ['./regionList.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    FilterRegionPipe,
    FilterRegionByCityPipe,
  ],
})
export class RegionListComponent implements OnInit {
  regionDTOs: RegionDTO[] = [];
  cities: City[] = [];
  filter1 = '';
  filter2 = '';

  componentTitle = 'Regions';
  constructor(
    private cityService: CityService,
    private toastrService: ToastrService,
    private regionService: RegionService,
    private authService: AuthService,
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
        this.cities = response.data;
      },
      (error) => console.error
    );
  }

  getRegions() {
    this.regionService.getAllDTO().subscribe(
      (response) => {
        this.regionDTOs = response.data;
      },
      (error) => console.error
    );
  }

  // updateAll() {
  //   this.regionDTOs.forEach((regionDTO) => {
  //     this.regionService
  //       .update(
  //         this.getModel(regionDTO.id, regionDTO.cityId, regionDTO.regionName)
  //       )
  //       .subscribe(
  //         (response) => {},
  //         (error) => console.error
  //       );
  //   });
  // }

  // getModel(id: number, cityId: number, regionName: string): Region {
  //   console;
  //   return Object.assign({
  //     id: id,
  //     cityId: cityId,
  //     regionName: this.caseService.capitalizeFirstLetter(regionName),
  //     createdDate: new Date(Date.now()).toJSON(),
  //     updatedDate: new Date(Date.now()).toJSON(),
  //     deletedDate: new Date(Date.now()).toJSON(),
  //   });
  // }

  delete(regionDTO: RegionDTO) {
    if (!this.authService.isAdmin('status')) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.regionService.delete(regionDTO).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile silindi');
        this.ngOnInit();
      },
      (error) => console.error
    );
  }

  deleteAll() {
    if (!this.authService.isAdmin('status')) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Tümünü Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.regionDTOs.forEach((regionDTO) => {
      this.regionService.delete(regionDTO).subscribe(
        (response) => {},
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  open(regionDTO: RegionDTO) {
    const modalRef = this.modalService.open(RegionUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.regionDTO = regionDTO;
  }

  openDetail(regionDTO: RegionDTO) {
    const modalRef = this.modalService.open(RegionDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.regionDTO = regionDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.getCities();
  }

  clearInput2() {
    this.filter2 = null;
    this.getRegions();
  }
}
