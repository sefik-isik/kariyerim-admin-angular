import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { City } from '../../../models/component/city';
import { CompanyUserAdvertJobDescription } from '../../../models/component/companyUserAdvertJobDescription';
import { CompanyUserAdvertJobDescriptionDTO } from '../../../models/dto/companyUserAdvertJobDescriptionDTO';
import { CompanyUserAdvertJobDescriptionService } from '../../../services/companyUserAdvertJobDescription.service';
import { ValidationService } from '../../../services/validation.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-companyUserAdvertJobDescriptionUpdate',
  templateUrl: './companyUserAdvertJobDescriptionUpdate.component.html',
  styleUrls: ['./companyUserAdvertJobDescriptionUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class CompanyUserAdvertJobDescriptionUpdateComponent implements OnInit {
  companyUserAdvertJobDescriptionDTO: CompanyUserAdvertJobDescriptionDTO =
    {} as CompanyUserAdvertJobDescriptionDTO;
  workCities: City[] = [];
  descriptionCount: number;
  admin: boolean = false;
  componentTitle = 'Company User Advert Job Description Update Form';

  constructor(
    private companyUserAdvertJobDescriptionService: CompanyUserAdvertJobDescriptionService,
    private toastrService: ToastrService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.companyUserAdvertJobDescriptionService
        .update(this.getModel())
        .subscribe(
          (response) => {
            this.activeModal.close();
            this.toastrService.success(response.message, 'Başarılı');
            this.router.navigate([
              '/dashboard/companyuseradvertjobdescription/companyuseradvertjobdescriptionlisttab',
            ]);
          },
          (responseError) => {
            this.validationService.handleErrors(responseError);
          }
        );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): CompanyUserAdvertJobDescription {
    return Object.assign({
      id: this.companyUserAdvertJobDescriptionDTO.id,
      userId: this.companyUserAdvertJobDescriptionDTO.userId,
      companyUserId: this.companyUserAdvertJobDescriptionDTO.companyUserId,
      advertId: this.companyUserAdvertJobDescriptionDTO.advertId,
      title: this.companyUserAdvertJobDescriptionDTO.title.trim(),
      description: this.companyUserAdvertJobDescriptionDTO.description.trim(),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  count() {
    this.descriptionCount =
      this.companyUserAdvertJobDescriptionDTO.description.length;
  }

  getWorkCityId(workCityName: string): string {
    const workCityId = this.workCities.filter(
      (w) => w.cityName === workCityName
    )[0]?.id;

    return workCityId;
  }

  titleClear() {
    this.companyUserAdvertJobDescriptionDTO.title = '';
  }

  descriptionClear() {
    this.companyUserAdvertJobDescriptionDTO.description = '';
  }
}
