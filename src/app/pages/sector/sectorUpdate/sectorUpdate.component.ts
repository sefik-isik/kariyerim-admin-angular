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
import { SectorService } from '../../../services/sectorService';
import { Sector } from '../../../models/sector';
import { CaseService } from '../../../services/case.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sectorUpdate',
  templateUrl: './sectorUpdate.component.html',
  styleUrls: ['./sectorUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class SectorUpdateComponent implements OnInit {
  updateForm: FormGroup;
  @Input() sector: Sector;
  sectorId: number;

  componentTitle = 'Sector Update Form';

  constructor(
    private sectorService: SectorService,

    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private caseService: CaseService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.createUpdateForm();

    setTimeout(() => {
      this.getById(this.sector.id);
    }, 200);
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      sectorName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  getById(id: number) {
    this.sectorService.getById(id).subscribe(
      (response) => {
        this.updateForm.patchValue({
          sectorName: response.data.sectorName,
        });
        this.sectorId = id;
      },
      (error) => console.error
    );
  }

  update() {
    if (this.updateForm.valid) {
      this.sectorService.update(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/sectors']);
        },
        (error) => {
          this.toastrService.error(error.error.message);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): Sector {
    return Object.assign({
      id: this.sectorId,
      sectorName: this.caseService.capitalizeFirstLetter(
        this.updateForm.value.sectorName
      ),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  clearInput1() {
    let value = this.updateForm.get('sectorName');
    value.reset();
  }
}
