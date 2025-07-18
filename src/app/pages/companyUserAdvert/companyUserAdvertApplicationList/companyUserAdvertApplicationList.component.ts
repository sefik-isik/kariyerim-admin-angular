import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminModel } from '../../../models/auth/adminModel';
import { PersonelUserAdvertFollowDTO } from '../../../models/dto/personelUserAdvertFollowDTO';
import { AdminService } from '../../../services/helperServices/admin.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { PersonelUserAdvertFollowService } from '../../../services/personelUserAdvertFollow.service';
import { ToastrService } from 'ngx-toastr';
import { CompanyUserAdvertDTO } from '../../../models/dto/companyUserAdvertDTO';
import { PersonelUserAdvertApplicationService } from '../../../services/personelUserAdvertApplication.service';
import { PersonelUserAdvertApplicationDTO } from '../../../models/dto/personelUserAdvertApplicationDTO';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-companyUserAdvertApplicationList',
  templateUrl: './companyUserAdvertApplicationList.component.html',
  styleUrls: ['./companyUserAdvertApplicationList.component.css'],
  imports: [CommonModule, FormsModule],
})
export class CompanyUserAdvertApplicationListComponent implements OnInit {
  @Input() companyUserAdvertDTO: CompanyUserAdvertDTO;
  personelUserAdvertApplicationDTOs: PersonelUserAdvertApplicationDTO[] = [];
  componentTitle = 'Adverts Application By Company User';

  constructor(
    private personelUserAdvertApplicationService: PersonelUserAdvertApplicationService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private localStorageService: LocalStorageService,
    private adminService: AdminService,
    private toastrService: ToastrService,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getAdminValues();

    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getAdminValues();
      }
    });
  }

  getAdminValues() {
    const id = this.localStorageService.getFromLocalStorage('id');
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getPersonelUserAdvertFollows(response);
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getPersonelUserAdvertFollows(adminModel: AdminModel) {
    adminModel.id = this.companyUserAdvertDTO.id;
    this.personelUserAdvertApplicationService
      .getAllByAdvertIdDTO(adminModel)
      .subscribe(
        (response) => {
          this.personelUserAdvertApplicationDTOs = response.data;
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
  }
}
