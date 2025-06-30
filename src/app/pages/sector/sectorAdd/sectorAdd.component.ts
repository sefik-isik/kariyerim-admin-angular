import { SectorService } from './../../../services/sectorService';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Sector } from '../../../models/component/sector';
import { CaseService } from '../../../services/helperServices/case.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-sectorAdd',
  templateUrl: './sectorAdd.component.html',
  styleUrls: ['./sectorAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class SectorAddComponent implements OnInit {
  sectorModel: Sector = {} as Sector;
  componentTitle = 'Sector Add Form';

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private sectorService: SectorService,
    private caseService: CaseService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {}

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.sectorService.add(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/sector/sectorlisttab']);
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): Sector {
    return Object.assign({
      id: '',
      sectorName: this.caseService.capitalizeFirstLetter(
        this.sectorModel.sectorName
      ),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  sectorNameClear() {
    this.sectorModel.sectorName = '';
  }
}
