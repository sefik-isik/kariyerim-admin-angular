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
import { Router, RouterLink } from '@angular/router';
import { Sector } from '../../../models/sector';
import { UniversityService } from '../../../services/university.service';
import { University } from '../../../models/university';
import { CaseService } from '../../../services/case.service';

@Component({
  selector: 'app-universityAdd',
  templateUrl: './universityAdd.component.html',
  styleUrls: ['./universityAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class UniversityAddComponent implements OnInit {
  addForm: FormGroup;
  componentTitle = 'Add University Form';

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private universityService: UniversityService,
    private caseService: CaseService
  ) {}

  ngOnInit() {
    this.createAddForm();
  }

  createAddForm() {
    this.addForm = this.formBuilder.group({
      universityName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  add() {
    if (this.addForm.valid && this.getModel()) {
      this.universityService.add(this.getModel()).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/universities']);
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
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  clearInput1() {
    let value = this.addForm.get('universityName');
    value.reset();
  }
}
