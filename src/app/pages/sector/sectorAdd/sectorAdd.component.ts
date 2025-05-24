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
import { Sector } from '../../../models/sector';
import { CaseService } from '../../../services/case.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sectorAdd',
  templateUrl: './sectorAdd.component.html',
  styleUrls: ['./sectorAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class SectorAddComponent implements OnInit {
  addForm: FormGroup;

  componentTitle = 'Add Sector Form';

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private sectorService: SectorService,
    private caseService: CaseService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.createAddForm();
  }

  createAddForm() {
    this.addForm = this.formBuilder.group({
      sectorName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  add() {
    if (this.addForm.valid && this.getModel()) {
      this.sectorService.add(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/sector/sectorlisttab']);
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
      sectorName: this.caseService.capitalizeFirstLetter(
        this.addForm.value.sectorName
      ),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  clearInput1() {
    let value = this.addForm.get('sectorName');
    value.reset();
  }
}
