import { SectorService } from './../../../services/sectorService';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UniversityService } from '../../../services/university.service';
import { University } from '../../../models/component/university';
import { CaseService } from '../../../services/helperServices/case.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Sector } from '../../../models/component/sector';
import { UniversityDTO } from '../../../models/dto/universityDTO';
import { ValidationService } from '../../../services/validation.service';
import { Count } from '../../../models/component/count';
import { CountService } from '../../../services/count.service';

@Component({
  selector: 'app-universityAdd',
  templateUrl: './universityAdd.component.html',
  styleUrls: ['./universityAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class UniversityAddComponent implements OnInit {
  universityModel: UniversityDTO = {} as UniversityDTO;
  sectors: Sector[];
  addressDetail: number;
  descriptionDetail: number;
  subDescriptionDetail: number;
  counts: Count[] = [];
  componentTitle = 'University Add Form';

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private universityService: UniversityService,
    private sectorService: SectorService,
    private countService: CountService,
    private caseService: CaseService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getCounts();
    this.getSectors();
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.universityService.add(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/university/universitylisttab']);
        },
        (responseError) => {
          console.log(responseError);
          this.toastrService.error(responseError.error.message);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): University {
    return Object.assign({
      id: '',
      universityName: this.caseService.capitalizeFirstLetter(
        this.universityModel.universityName.trim()
      ),
      sectorId: this.getSectorId(this.universityModel.sectorName.trim()),
      yearOfEstablishment: new Date(
        this.universityModel.yearOfEstablishment
      ).toJSON(),
      webAddress: this.universityModel.webAddress.trim(),
      workerCountId: this.getCountId(
        this.universityModel.workerCountValue.trim()
      ),
      webNewsAddress: this.universityModel.webNewsAddress.trim(),
      youTubeEmbedAddress: this.universityModel.youTubeEmbedAddress.trim(),
      address: this.universityModel.address.trim(),
      facebookAddress: this.universityModel.facebookAddress.trim(),
      instagramAddress: this.universityModel.instagramAddress.trim(),
      xAddress: this.universityModel.xAddress.trim(),
      youTubeAddress: this.universityModel.youTubeAddress.trim(),
      description: this.universityModel.description.trim(),
      subDescription: this.universityModel.subDescription.trim(),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getCounts() {
    this.countService.getAll().subscribe(
      (response) => {
        this.counts = response.data;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getSectors() {
    this.sectorService.getAll().subscribe(
      (response) => {
        this.sectors = response.data;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getSectorId(sectorName: string): string {
    const companyUserSectorId = this.sectors.filter(
      (c) => c.sectorName === sectorName
    )[0]?.id;

    return companyUserSectorId;
  }

  getCountId(countValue: string): string {
    const countId = this.counts.filter((c) => c.countValue === countValue)[0]
      ?.id;

    return countId;
  }

  countAddress() {
    this.addressDetail = this.universityModel.address.length;
  }

  countDescription() {
    this.descriptionDetail = this.universityModel.description.length;
  }

  countSubDescription() {
    this.subDescriptionDetail = this.universityModel.subDescription.length;
  }

  universityNameClear() {
    this.universityModel.universityName = '';
  }

  yearOfEstablishmentClear() {
    this.universityModel.yearOfEstablishment = '';
  }

  workerCountClear() {
    this.universityModel.workerCountValue = '';
  }

  sectorNameClear() {
    this.universityModel.sectorName = '';
  }

  webAddressClear() {
    this.universityModel.webAddress = '';
  }

  webNewsAddressClear() {
    this.universityModel.webNewsAddress = '';
  }

  youTubeEmbedAddressClear() {
    this.universityModel.youTubeEmbedAddress = '';
  }

  facebookAddressClear() {
    this.universityModel.facebookAddress = '';
  }

  instagramAddressClear() {
    this.universityModel.instagramAddress = '';
  }

  xAddressClear() {
    this.universityModel.xAddress = '';
  }

  youTubeAddressClear() {
    this.universityModel.youTubeAddress = '';
  }

  addressClear() {
    this.universityModel.address = '';
  }

  descriptionClear() {
    this.universityModel.description = '';
  }

  subDescriptionClear() {
    this.universityModel.subDescription = '';
  }
}
