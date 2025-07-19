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
          this.validationService.handleSuccesses(response);
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/university/universitylisttab']);
        },
        (responseError) => {
          this.validationService.handleErrors(responseError);
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
        this.universityModel.universityName
      ),
      address: this.universityModel.address,
      description: this.universityModel.description,
      subDescription: this.universityModel.subDescription,

      sectorId: this.getSectorId(this.universityModel.sectorName),
      yearOfEstablishment: new Date(
        this.setNullDateValue(this.universityModel.yearOfEstablishment)
      ).toJSON(),
      webAddress: this.setNullValue(this.universityModel.webAddress),
      workerCountId: this.getCountId(this.universityModel.workerCountValue),
      webNewsAddress: this.setNullValue(this.universityModel.webNewsAddress),
      youTubeEmbedAddress: this.setNullValue(
        this.universityModel.youTubeEmbedAddress
      ),
      facebookAddress: this.setNullValue(this.universityModel.facebookAddress),
      instagramAddress: this.setNullValue(
        this.universityModel.instagramAddress
      ),
      xAddress: this.setNullValue(this.universityModel.xAddress),
      youTubeAddress: this.setNullValue(this.universityModel.youTubeAddress),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  setNullValue(value: string) {
    if (value == null || value == '') {
      value = '-';
    } else {
      this.caseService.capitalizeFirstLetter(value);
    }
    return value;
  }

  setNullDateValue(value: string) {
    if (value == null || value == '') {
      value = '01.01.1900';
    }
    return value;
  }

  getCounts() {
    this.countService.getAll().subscribe(
      (response) => {
        this.universityModel.workerCountId = response.data.filter(
          (f) => f.countValue == '-'
        )[0]?.id;

        this.validationService.handleSuccesses(response);
        this.counts = response.data.filter((f) => f.countValue != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getSectors() {
    this.sectorService.getAll().subscribe(
      (response) => {
        this.universityModel.sectorId = response.data.filter(
          (f) => f.sectorName == '-'
        )[0]?.id;

        this.validationService.handleSuccesses(response);
        this.sectors = response.data.filter((f) => f.sectorName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getSectorId(sectorName: string): string {
    let sectorId: string;

    sectorName == null || sectorName == '' || sectorName == '-'
      ? (sectorId = this.universityModel.sectorId)
      : (sectorId = this.sectors.filter((c) => c.sectorName === sectorName)[0]
          ?.id);

    return sectorId;
  }

  getCountId(countValue: string): string {
    let countId: string;

    countValue == null || countValue == '' || countValue == '-'
      ? (countId = this.universityModel.workerCountId)
      : (countId = this.counts.filter((c) => c.countValue === countValue)[0]
          ?.id);

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

  workerCountValueClear() {
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
