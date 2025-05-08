import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CityService } from '../../../services/city.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { RegionDTO } from '../../../models/regionDTO';
import { City } from '../../../models/city';
import { RegionService } from '../../../services/region.service';
import { FilterRegionPipe } from '../../../pipes/filterRegion.pipe';
import { FilterRegionByCityPipe } from '../../../pipes/filterRegionByCity.pipe';
import { Region } from '../../../models/region';
import { CaseService } from '../../../services/case.service';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    FilterRegionPipe,
    FilterRegionByCityPipe,
    RouterLink,
  ],
})
export class RegionComponent implements OnInit {
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
    private caseService: CaseService
  ) {}

  ngOnInit() {
    this.getCities();
    this.getRegions();
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
  //         (error) => console.log(error)
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

  clearInput1() {
    this.filter1 = null;
    this.getCities();
  }

  clearInput2() {
    this.filter2 = null;
    this.getRegions();
  }
}
