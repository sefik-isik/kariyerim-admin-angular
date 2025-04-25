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
    private universityService: UniversityService
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
      universityName: this.capitalizeFirstLetter(
        this.addForm.value.universityName
      ),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  capitalizeFirstLetter(str: string) {
    let strs: string[] = str.split(' ');
    let strText: string = '';

    strs.forEach((str) => {
      str = str.toLowerCase();
      str = str[0].toUpperCase() + str.slice(1);
      strText = strText + ' ' + str;
      strText = strText.trim();
    });
    return strText;
  }

  clearInput1() {
    let value = this.addForm.get('universityName');
    value.reset();
  }
}
