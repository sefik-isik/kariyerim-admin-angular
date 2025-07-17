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

@Component({
  selector: 'app-companyUserAdvertFollowList',
  templateUrl: './companyUserAdvertFollowList.component.html',
  styleUrls: ['./companyUserAdvertFollowList.component.css'],
  imports: [CommonModule, FormsModule],
})
export class CompanyUserAdvertFollowListComponent implements OnInit {
  @Input() companyUserAdvertDTO: CompanyUserAdvertDTO;
  personelUserAdvertFollowDTOs: PersonelUserAdvertFollowDTO[] = [];
  componentTitle = 'Adverts Follow By Company User';

  constructor(
    private personelUserAdvertFollowService: PersonelUserAdvertFollowService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private localStorageService: LocalStorageService,
    private adminService: AdminService,
    private toastrService: ToastrService
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
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getPersonelUserAdvertFollows(adminModel: AdminModel) {
    adminModel.id = this.companyUserAdvertDTO.id;
    this.personelUserAdvertFollowService
      .getAllByAdvertIdDTO(adminModel)
      .subscribe(
        (response) => {
          this.personelUserAdvertFollowDTOs = response.data;
        },
        (responseError) => this.toastrService.error(responseError.error.message)
      );
  }
}
