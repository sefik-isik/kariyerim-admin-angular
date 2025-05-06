import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CityService } from '../../../services/city.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { RegionDTO } from '../../../models/regionDTO';
import { City } from '../../../models/city';
import { RegionService } from '../../../services/region.service';
import { FilterRegionPipe } from '../../../pipes/filterRegion.pipe';
import { FilterRegionByCityPipe } from '../../../pipes/filterRegionByCity.pipe';

@Component({
  selector: 'app-regionOfDeleted',
  templateUrl: './regionOfDeleted.component.html',
  styleUrls: ['./regionOfDeleted.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    FilterRegionPipe,
    FilterRegionByCityPipe,
  ],
})
export class RegionOfDeletedComponent implements OnInit {
  regionDTOs: RegionDTO[] = [];
  cities: City[];
  dataLoaded = false;
  filter1 = '';
  filter2 = '';
  componentTitle = 'Deleted Regions';
  constructor(
    private cityService: CityService,
    private toastrService: ToastrService,
    private regionService: RegionService
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
    this.regionService.getAllDeletedDTO().subscribe(
      (response) => {
        this.regionDTOs = response.data;
      },
      (error) => console.error
    );
  }

  unDelete(region: RegionDTO) {
    this.regionService.update(region).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (error) => console.error
    );
  }

  unDeleteAll() {
    this.regionDTOs.forEach((region) => {
      this.regionService.update(region).subscribe(
        (response) => {},
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
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
