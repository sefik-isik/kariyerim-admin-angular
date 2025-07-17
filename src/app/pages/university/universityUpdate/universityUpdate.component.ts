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
        this.universityDTO.id = id;
        this.universityDTO.yearOfEstablishment = this.formatDate(
          this.universityDTO.yearOfEstablishment
        );
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.universityService.update(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/university/universitylisttab']);
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message);
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
        this.universityDTO.universityName.trim()
      ),
      sectorId: this.getSectorId(this.universityDTO.sectorName.trim()),
      yearOfEstablishment: new Date(
        this.universityDTO.yearOfEstablishment
      ).toJSON(),
      webAddress: this.universityDTO.webAddress.trim(),
      workerCountId: this.getCountId(
        this.universityDTO.workerCountValue.trim()
      ),
      webNewsAddress: this.universityDTO.webNewsAddress.trim(),
      youTubeEmbedAddress: this.universityDTO.youTubeEmbedAddress.trim(),
      address: this.universityDTO.address.trim(),
      facebookAddress: this.universityDTO.facebookAddress.trim(),
      instagramAddress: this.universityDTO.instagramAddress.trim(),
      xAddress: this.universityDTO.xAddress.trim(),
      youTubeAddress: this.universityDTO.youTubeAddress.trim(),
      description: this.universityDTO.description.trim(),
      subDescription: this.universityDTO.subDescription.trim(),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
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

  getCountId(countValue: string): string {
    const countId = this.counts.filter((c) => c.countValue === countValue)[0]
      ?.id;

    return countId;
  }

  getSectorNameById(sectorId: string): string {
    return this.sectors.find((c) => c.id == sectorId)?.sectorName;
  }

  getSectorId(sectorName: string): string {
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
