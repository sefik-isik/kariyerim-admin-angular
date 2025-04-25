import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
import { UniversityService } from '../../../services/university.service';
import { University } from '../../../models/university';

@Component({
  selector: 'app-universityUpdate',
  templateUrl: './universityUpdate.component.html',
  styleUrls: ['./universityUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class UniversityUpdateComponent implements OnInit {
  uptadeForm: FormGroup;
  universityId: number;
  componentTitle = 'University Update';

  constructor(
    private universityService: UniversityService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createUpdateForm();
    this.activatedRoute.params.subscribe((params) => {
      this.getById(params['universityId']);
    });
  }

  createUpdateForm() {
    this.uptadeForm = this.formBuilder.group({
      universityName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  getById(id: number) {
    this.universityService.getById(id).subscribe(
      (response) => {
        this.uptadeForm.patchValue({
          universityName: response.data.universityName,
        });
        this.universityId = id;
      },
      (error) => console.error
    );
  }

  update() {
    if (this.uptadeForm.valid) {
      this.universityService.update(this.getModel()).subscribe(
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
      id: this.universityId,
      universityName: this.capitalizeFirstLetter(
        this.uptadeForm.value.universityName
      ),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
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
    let value = this.uptadeForm.get('universityName');
    value.reset();
  }
}
