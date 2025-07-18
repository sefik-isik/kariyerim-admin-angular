import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Region } from '../../../models/component/region';
import { RegionDTO } from '../../../models/dto/regionDTO';
import { CaseService } from '../../../services/helperServices/case.service';
import { RegionService } from '../../../services/region.service';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-regionUpdate',
  templateUrl: './regionUpdate.component.html',
  styleUrls: ['./regionUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class RegionUpdateComponent implements OnInit {
  @Input() regionDTO: RegionDTO;
  componentTitle = 'Region Update Form';

  constructor(
    private regionService: RegionService,
    private toastrService: ToastrService,
    private router: Router,
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
      this.regionService.update(this.getModel()).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/region/regionlisttab']);
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): Region {
    return Object.assign({
      id: this.regionDTO.id,
      countryId: this.regionDTO.countryId,
      cityId: this.regionDTO.cityId,
      regionName: this.caseService.capitalizeFirstLetter(
        this.regionDTO.regionName.trim()
      ),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  regionNameClear() {
    this.regionDTO.regionName = '';
  }
}
