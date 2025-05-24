import { SectorService } from './../../../services/sectorService';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UniversityService } from '../../../services/university.service';
import { University } from '../../../models/university';
import { CaseService } from '../../../services/case.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Sector } from '../../../models/sector';

@Component({
  selector: 'app-universityAdd',
  templateUrl: './universityAdd.component.html',
  styleUrls: ['./universityAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class UniversityAddComponent implements OnInit {
  addForm: FormGroup;
  sectors: Sector[];
  addressDetail: string;
  descriptionDetail: string;
  subDescriptionDetail: string;
  componentTitle = 'Add University Form';

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private universityService: UniversityService,
    private sectorService: SectorService,
    private caseService: CaseService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.createAddForm();
    this.getSectors();
  }

  createAddForm() {
    this.addForm = this.formBuilder.group({
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

  add() {
    console.log(this.getModel());
    if (this.addForm.valid && this.getModel()) {
      this.universityService.add(this.getModel()).subscribe(
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
      universityName: this.caseService.capitalizeFirstLetter(
        this.addForm.value.universityName
      ),
      sectorId: this.getSectorId(this.addForm.value.sectorName),
      yearOfEstablishment: new Date(
        this.addForm.value.yearOfEstablishment
      ).toJSON(),
      webAddress: this.addForm.value.webAddress,
      workerCount: this.addForm.value.workerCount,
      webNewsAddress: this.addForm.value.webNewsAddress,
      youTubeEmbedAddress: this.addForm.value.youTubeEmbedAddress,
      address: this.addForm.value.address,
      facebookAddress: this.addForm.value.facebookAddress,
      instagramAddress: this.addForm.value.instagramAddress,
      xAddress: this.addForm.value.xAddress,
      youTubeAddress: this.addForm.value.youTubeAddress,
      description: this.addForm.value.description,
      subDescription: this.addForm.value.subDescription,
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getSectors() {
    this.sectorService.getAll().subscribe(
      (response) => {
        this.sectors = response.data;
      },
      (error) => console.error
    );
  }

  getSectorId(sectorName: string): number {
    const companyUserSectorId = this.sectors.filter(
      (c) => c.sectorName === sectorName
    )[0]?.id;

    return companyUserSectorId;
  }

  countAddress() {
    this.addressDetail = this.addForm.value.address.length;
  }

  countDescription() {
    this.descriptionDetail = this.addForm.value.description.length;
  }

  countSubDescription() {
    this.subDescriptionDetail = this.addForm.value.subDescription.length;
  }

  clearInput1() {
    let value = this.addForm.get('universityName');
    value.reset();
  }

  clearInput2() {
    let value = this.addForm.get('yearOfEstablishment');
    value.reset();
  }

  clearInput3() {
    let value = this.addForm.get('workerCount');
    value.reset();
  }

  clearInput4() {
    let value = this.addForm.get('sectorName');
    value.reset();
  }

  clearInput5() {
    let value = this.addForm.get('webAddress');
    value.reset();
  }

  clearInput6() {
    let value = this.addForm.get('webNewsAddress');
    value.reset();
  }

  clearInput7() {
    let value = this.addForm.get('youTubeEmbedAddress');
    value.reset();
  }

  clearInput8() {
    let value = this.addForm.get('facebookAddress');
    value.reset();
  }

  clearInput9() {
    let value = this.addForm.get('instagramAddress');
    value.reset();
  }

  clearInput10() {
    let value = this.addForm.get('xAddress');
    value.reset();
  }

  clearInput11() {
    let value = this.addForm.get('youTubeAddress');
    value.reset();
  }

  clearInput12() {
    let value = this.addForm.get('address');
    this.addressDetail = '';
    value.reset();
  }

  clearInput13() {
    let value = this.addForm.get('description');
    this.descriptionDetail = '';
    value.reset();
  }

  clearInput14() {
    let value = this.addForm.get('subDescription');
    this.subDescriptionDetail = '';
    value.reset();
  }
}
