import { LocalStorageService } from './../../../services/localStorage.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/userDTO';
import { AdminService } from '../../../services/admin.service';
import { AdminModel } from '../../../models/adminModel';
import { FilterPersonelUserFileByUserPipe } from '../../../pipes/filterPersonelUserFileByUser.pipe';
import { PersonelUserFileDTO } from '../../../models/personelUserFileDTO';
import { PersonelUserFileService } from '../../../services/personelUserFile.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserCvEducationUpdateComponent } from '../../personelUserCvEducation/personelUserCvEducationUpdate/personelUserCvEducationUpdate.component';
import { PersonelUserCvEducationDetailComponent } from '../../personelUserCvEducation/personelUserCvEducationDetail/personelUserCvEducationDetail.component';
import { PersonelUserFileUpdateComponent } from '../personelUserFileUpdate/personelUserFileUpdate.component';
import { PersonelUserFileDetailComponent } from '../personelUserFileDetail/personelUserFileDetail.component';

@Component({
  selector: 'app-personelUserFileDeletedList',
  templateUrl: './personelUserFileDeletedList.component.html',
  styleUrls: ['./personelUserFileDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterPersonelUserFileByUserPipe],
})
export class PersonelUserFileDeletedListComponent implements OnInit {
  personelUserFileDTOs: PersonelUserFileDTO[] = [];
  userDTOs: UserDTO[] = [];
  dataLoaded = false;
  filter1: string = '';

  componentTitle = 'Personel User Files Deleted List';
  userId: number;

  constructor(
    private personelUserFileService: PersonelUserFileService,
    private toastrService: ToastrService,
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
    const id = parseInt(this.localStorageService.getFromLocalStorage('id'));
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getAllPersonelUsers(response);
        this.getPersonelUserFiles(response);
      },
      (error) => console.error
    );
  }

  getAllPersonelUsers(adminModel: AdminModel) {
    this.userService.getAllPersonelUserDTO(adminModel).subscribe(
      (response) => {
        this.userDTOs = response.data;
      },
      (error) => console.error
    );
  }

  getPersonelUserFiles(adminModel: AdminModel) {
    this.personelUserFileService.getAllDeletedDTO(adminModel).subscribe(
      (response) => {
        console.log(response.data);
        this.personelUserFileDTOs = response.data;
      },
      (error) => console.error
    );
  }

  unDelete(personelUserFileDTO: PersonelUserFileDTO) {
    this.personelUserFileService.update(personelUserFileDTO).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile geri alındı');
        this.ngOnInit();
      },
      (error) => console.error
    );
  }

  unDeleteAll() {
    this.personelUserFileDTOs.forEach((personelUserFileDTO) => {
      this.personelUserFileService.update(personelUserFileDTO).subscribe(
        (response) => {},
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  open(personelUserFileDTO: PersonelUserFileDTO) {
    const modalRef = this.modalService.open(PersonelUserFileUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.personelUserFileDTO = personelUserFileDTO;
  }

  openDetail(personelUserFileDTO: PersonelUserFileDTO) {
    const modalRef = this.modalService.open(PersonelUserFileDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.personelUserFileDTO = personelUserFileDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.getAdminValues();
  }
}
