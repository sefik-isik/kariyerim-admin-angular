import { Component, Input, OnInit } from '@angular/core';

import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UniversityService } from '../../../services/university.service';
import { University } from '../../../models/university';
import { CaseService } from '../../../services/case.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Sector } from '../../../models/sector';
import { SectorService } from '../../../services/sectorService';
import { UniversityDTO } from '../../../models/universityDTO';

@Component({
  selector: 'app-universityUpdate',
  templateUrl: './universityUpdate.component.html',
  styleUrls: ['./universityUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class UniversityUpdateComponent implements OnInit {
  updateForm: FormGroup;
  @Input() universityDTO: UniversityDTO;
  universityId: number;
  sectors: Sector[];
  addressDetail: string;
  descriptionDetail: string;
  subDescriptionDetail: string;
  componentTitle = 'University Update Form';

  constructor(
    private universityService: UniversityService,

    private formBuilder: FormBuilder,
    private sectorService: SectorService,
    private toastrService: ToastrService,
    private router: Router,
    private caseService: CaseService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.createUpdateForm();
    this.getSectors();

    setTimeout(() => {
      this.getById(this.universityDTO.id);
    }, 200);
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      universityName: ['', [Validators.required, Validators.minLength(3)]],
      sectorName: ['', [Validators.required, Validators.minLength(3)]],
      yearOfEstablishment: ['', [Validators.required, Validators.minLength(3)]],
      workerCount: ['', [Validators.required, Validators.minLength(3)]],
      webAddress: ['', [Validators.required, Validators.minLength(3)]],
      webNewsAddress: ['', [Validators.required, Validators.minLength(3)]],
      youTubeEmbedAddress: ['', [Validators.required, Validators.minLength(3)]],
      facebookAddress: ['', [Validators.required, Validators.minLength(3)]],
      instagramAddress: ['', [Validators.required, Validators.minLength(3)]],
      xAddress: ['', [Validators.required, Validators.minLength(3)]],
      youTubeAddress: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(20)]],
      description: ['', [Validators.required, Validators.minLength(100)]],
      subDescription: ['', [Validators.required, Validators.minLength(100)]],
    });
  }

  getById(id: number) {
    this.universityService.getById(id).subscribe(
      (response) => {
        this.updateForm.patchValue({
          universityName: response.data.universityName,
          sectorName: this.getSectorNameById(response.data.sectorId),
          yearOfEstablishment: this.formatDate(
            response.data.yearOfEstablishment
          ),
          workerCount: response.data.workerCount,
          webAddress: response.data.webAddress,
          webNewsAddress: response.data.webNewsAddress,
          youTubeEmbedAddress: response.data.youTubeEmbedAddress,
          facebookAddress: response.data.facebookAddress,
          instagramAddress: response.data.instagramAddress,
          xAddress: response.data.xAddress,
          youTubeAddress: response.data.youTubeAddress,
          address: response.data.address,
          description: response.data.description,
          subDescription: response.data.subDescription,
        });
        this.universityId = id;
      },
      (error) => console.error
    );
  }

  update() {
    if (this.updateForm.valid) {
      this.universityService.update(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/university/universitylisttab']);
        },
        (error) => {
          this.toastrService.error(error.error.message);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): University {
    return Object.assign({
      id: this.universityId,
      universityName: this.caseService.capitalizeFirstLetter(
        this.updateForm.value.universityName
      ),
      sectorId: this.getSectorId(this.updateForm.value.sectorName),
      yearOfEstablishment: new Date(
        this.updateForm.value.yearOfEstablishment
      ).toJSON(),
      webAddress: this.updateForm.value.webAddress,
      workerCount: this.updateForm.value.workerCount,
      webNewsAddress: this.updateForm.value.webNewsAddress,
      youTubeEmbedAddress: this.updateForm.value.youTubeEmbedAddress,
      address: this.updateForm.value.address,
      facebookAddress: this.updateForm.value.facebookAddress,
      instagramAddress: this.updateForm.value.instagramAddress,
      xAddress: this.updateForm.value.xAddress,
      youTubeAddress: this.updateForm.value.youTubeAddress,
      description: this.updateForm.value.description,
      subDescription: this.updateForm.value.subDescription,
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

  getSectors() {
    this.sectorService.getAll().subscribe(
      (response) => {
        this.sectors = response.data;
      },
      (error) => console.error
    );
  }

  getSectorNameById(sectorId: number): string {
    return this.sectors.find((c) => c.id == sectorId)?.sectorName;
  }

  getSectorId(sectorName: string): number {
    const companyUserSectorId = this.sectors.filter(
      (c) => c.sectorName === sectorName
    )[0]?.id;

    return companyUserSectorId;
  }

  countAddress() {
    this.addressDetail = this.updateForm.value.address.length;
  }

  countDescription() {
    this.descriptionDetail = this.updateForm.value.description.length;
  }

  countSubDescription() {
    this.subDescriptionDetail = this.updateForm.value.subDescription.length;
  }

  clearInput1() {
    let value = this.updateForm.get('universityName');
    value.reset();
  }

  clearInput2() {
    let value = this.updateForm.get('yearOfEstablishment');
    value.reset();
  }

  clearInput3() {
    let value = this.updateForm.get('workerCount');
    value.reset();
  }

  clearInput4() {
    let value = this.updateForm.get('sectorName');
    value.reset();
  }

  clearInput5() {
    let value = this.updateForm.get('webAddress');
    value.reset();
  }

  clearInput6() {
    let value = this.updateForm.get('webNewsAddress');
    value.reset();
  }

  clearInput7() {
    let value = this.updateForm.get('youTubeEmbedAddress');
    value.reset();
  }

  clearInput8() {
    let value = this.updateForm.get('facebookAddress');
    value.reset();
  }

  clearInput9() {
    let value = this.updateForm.get('instagramAddress');
    value.reset();
  }

  clearInput10() {
    let value = this.updateForm.get('xAddress');
    value.reset();
  }

  clearInput11() {
    let value = this.updateForm.get('youTubeAddress');
    value.reset();
  }

  clearInput12() {
    let value = this.updateForm.get('address');
    this.addressDetail = '';
    value.reset();
  }

  clearInput13() {
    let value = this.updateForm.get('description');
    this.descriptionDetail = '';
    value.reset();
  }

  clearInput14() {
    let value = this.updateForm.get('subDescription');
    this.subDescriptionDetail = '';
    value.reset();
  }
}
