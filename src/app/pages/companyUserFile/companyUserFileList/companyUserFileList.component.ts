import { CompanyUserFileService } from '../../../services/companyUserFile.service';
import { FilterCompanyUserFileByUserPipe } from '../../../pipes/filterCompanyUserFileByUser.pipe';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { CompanyUserFile } from '../../../models/component/companyUserFile';
import { CompanyUserFileDTO } from '../../../models/dto/companyUserFileDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { UserService } from '../../../services/user.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { AdminModel } from '../../../models/auth/adminModel';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyUserFileUpdateComponent } from '../companyUserFileUpdate/companyUserFileUpdate.component';
import { CompanyUserFileDetailComponent } from '../companyUserFileDetail/companyUserFileDetail.component';

@Component({
  selector: 'app-companyUserFileList',
  templateUrl: './companyUserFileList.component.html',
  styleUrls: ['./companyUserFileList.component.css'],
  imports: [CommonModule, FormsModule, FilterCompanyUserFileByUserPipe],
})
export class CompanyUserFileComponent implements OnInit {
  companyUserFileDTOS: CompanyUserFileDTO[] = [];
  userDTOs: UserDTO[] = [];
  dataLoaded = false;
  filter1: string = '';

  componentTitle = 'Company User Files';
  userId: string;

  constructor(
    private toastrService: ToastrService,
    private companyUserFileService: CompanyUserFileService,
    private adminService: AdminService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private modalService: NgbModal
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
        this.getAllCompanyUsers(response);
        this.getCompanyUserFiles(response);
      },
      (responseError) => console.error
    );
  }

  getAllCompanyUsers(adminModel: AdminModel) {
    this.userService.getAllCompanyUserDTO(adminModel).subscribe(
      (response) => {
        this.userDTOs = response.data;
      },
      (responseError) => console.error
    );
  }

  getCompanyUserFiles(adminModel: AdminModel) {
    this.companyUserFileService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.companyUserFileDTOS = response.data;
      },
      (responseError) => console.error
    );
  }

  delete(companyUserFile: CompanyUserFile) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.companyUserFileService.delete(companyUserFile).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile silindi');
        this.ngOnInit();
      },
      (responseError) => console.error
    );
  }

  deleteAll() {
    if (!confirm('Tümünü Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.companyUserFileDTOS.forEach((companyUserFile) => {
      this.companyUserFileService.delete(companyUserFile).subscribe(
        (response) => {},
        (responseError) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  open(companyUserFileDTO: CompanyUserFileDTO) {
    const modalRef = this.modalService.open(CompanyUserFileUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.companyUserFileDTO = companyUserFileDTO;
  }

  openDetail(companyUserFileDTO: CompanyUserFileDTO) {
    const modalRef = this.modalService.open(CompanyUserFileDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.companyUserFileDTO = companyUserFileDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.getAdminValues();
  }
}
