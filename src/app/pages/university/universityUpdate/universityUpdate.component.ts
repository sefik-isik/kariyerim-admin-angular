import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UniversityService } from '../../../services/university.service';
import { University } from '../../../models/component/university';
import { CaseService } from '../../../services/helperServices/case.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Sector } from '../../../models/component/sector';
import { SectorService } from '../../../services/sectorService';
import { UniversityDTO } from '../../../models/dto/universityDTO';
import { ValidationService } from '../../../services/validation.service';
import { Count } from '../../../models/component/count';
import { CountService } from '../../../services/count.service';

@Component({
  selector: 'app-universityUpdate',
  templateUrl: './universityUpdate.component.html',
  styleUrls: ['./universityUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class UniversityUpdateComponent implements OnInit {
  @Input() universityDTO: UniversityDTO;
  sectors: Sector[];
  addressDetail: number;
  descriptionDetail: number;
  subDescriptionDetail: number;
  counts: Count[] = [];
  componentTitle = 'University Update Form';

  constructor(
    private universityService: UniversityService,
    private sectorService: SectorService,
    private countService: CountService,
    private toastrService: ToastrService,
    private router: Router,
    private caseService: CaseService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getCounts();
    this.getSectors();
    setTimeout(() => {
      this.getById(this.universityDTO.id);
    }, 200);
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  getById(id: string) {
    this.universityService.getById(id).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.universityDTO.id = id;
        this.universityDTO.yearOfEstablishment = this.formatDate(
          this.universityDTO.yearOfEstablishment
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.universityService.update(this.getModel()).subscribe(
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
      id: this.universityDTO.id,
      universityName: this.caseService.capitalizeFirstLetter(
        this.universityDTO.universityName
      ),
      address: this.universityDTO.address,
      description: this.universityDTO.description,
      subDescription: this.universityDTO.subDescription,

      sectorId: this.getSectorId(this.universityDTO.sectorName),
      yearOfEstablishment: new Date(
        this.setNullDateValue(this.universityDTO.yearOfEstablishment)
      ).toJSON(),
      webAddress: this.setNullValue(this.universityDTO.webAddress),
      workerCountId: this.getCountId(this.universityDTO.workerCountValue),
      webNewsAddress: this.setNullValue(this.universityDTO.webNewsAddress),
      youTubeEmbedAddress: this.setNullValue(
        this.universityDTO.youTubeEmbedAddress
      ),
      facebookAddress: this.setNullValue(this.universityDTO.facebookAddress),
      instagramAddress: this.setNullValue(this.universityDTO.instagramAddress),
      xAddress: this.setNullValue(this.universityDTO.xAddress),
      youTubeAddress: this.setNullValue(this.universityDTO.youTubeAddress),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
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

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getCounts() {
    this.countService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.counts = response.data.filter((f) => f.countValue != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getSectors() {
    this.sectorService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.sectors = response.data.filter((f) => f.sectorName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getCountId(countValue: string): string {
    if (countValue == null || countValue == '') {
      countValue = '-';
    }
    const countId = this.counts.filter((c) => c.countValue === countValue)[0]
      ?.id;

    return countId;
  }

  getSectorNameById(sectorId: string): string {
    return this.sectors.find((c) => c.id == sectorId)?.sectorName;
  }

  getSectorId(sectorName: string): string {
    if (sectorName == null || sectorName == '') {
      sectorName = '-';
    }
    const companyUserSectorId = this.sectors.filter(
      (c) => c.sectorName === sectorName
    )[0]?.id;

    return companyUserSectorId;
  }

  countAddress() {
    this.addressDetail = this.universityDTO.address.length;
  }

  countDescription() {
    this.descriptionDetail = this.universityDTO.description.length;
  }

  countSubDescription() {
    this.subDescriptionDetail = this.universityDTO.subDescription.length;
  }

  universityNameClear() {
    this.universityDTO.universityName = '';
  }

  yearOfEstablishmentClear() {
    this.universityDTO.yearOfEstablishment = '';
  }

  workerCountClear() {
    this.universityDTO.workerCountValue = '';
  }

  sectorNameClear() {
    this.universityDTO.sectorName = '';
  }

  webAddressClear() {
    this.universityDTO.webAddress = '';
  }

  webNewsAddressClear() {
    this.universityDTO.webNewsAddress = '';
  }

  youTubeEmbedAddressClear() {
    this.universityDTO.youTubeEmbedAddress = '';
  }

  facebookAddressClear() {
    this.universityDTO.facebookAddress = '';
  }

  instagramAddressClear() {
    this.universityDTO.instagramAddress = '';
  }

  xAddressClear() {
    this.universityDTO.xAddress = '';
  }

  youTubeAddressClear() {
    this.universityDTO.youTubeAddress = '';
  }

  addressClear() {
    this.universityDTO.address = '';
  }

  descriptionClear() {
    this.universityDTO.description = '';
  }

  subDescriptionClear() {
    this.universityDTO.subDescription = '';
  }
}
