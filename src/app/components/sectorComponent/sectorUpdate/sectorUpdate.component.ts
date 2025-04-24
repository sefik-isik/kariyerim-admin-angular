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

@Component({
  selector: 'app-sectorUpdate',
  templateUrl: './sectorUpdate.component.html',
  styleUrls: ['./sectorUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class SectorUpdateComponent implements OnInit {
  uptadeForm: FormGroup;
  sectorId: number;
  componentTitle = 'Sector Update';

  constructor(
    private sectorService: SectorService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createUpdateForm();
    this.activatedRoute.params.subscribe((params) => {
      this.getById(params['sectorId']);
    });
  }

  createUpdateForm() {
    this.uptadeForm = this.formBuilder.group({
      sectorName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  getById(id: number) {
    this.sectorService.getById(id).subscribe(
      (response) => {
        this.uptadeForm.patchValue({
          sectorName: response.data.sectorName,
        });
        this.sectorId = id;
      },
      (error) => console.error
    );
  }

  update() {
    if (this.uptadeForm.valid) {
      this.sectorService.update(this.getModel()).subscribe(
        (response) => {
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
      sectorName: this.uptadeForm.value.sectorName,
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  clearInput1() {
    let value = this.uptadeForm.get('sectorName');
    value.reset();
  }
}
