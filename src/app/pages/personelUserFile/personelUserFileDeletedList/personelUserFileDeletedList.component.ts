import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/dto/userDTO';
import { AdminService } from '../../../services/helperServices/admin.service';
import { AdminModel } from '../../../models/auth/adminModel';
import { FilterPersonelUserFileByUserPipe } from '../../../pipes/filterPersonelUserFileByUser.pipe';
import { PersonelUserFileDTO } from '../../../models/dto/personelUserFileDTO';
import { PersonelUserFileService } from '../../../services/personelUserFile.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  userId: string;

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
    const id = this.localStorageService.getFromLocalStorage('id');
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getAllPersonelUsers(response);
        this.getPersonelUserFiles(response);
      },
      (responseError) => console.error
    );
  }

  getAllPersonelUsers(adminModel: AdminModel) {
    this.userService.getAllPersonelUserDTO(adminModel).subscribe(
      (response) => {
        this.userDTOs = response.data;
      },
      (responseError) => console.error
    );
  }

  getPersonelUserFiles(adminModel: AdminModel) {
    this.personelUserFileService.getDeletedAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserFileDTOs = response.data;
      },
      (responseError) => console.error
    );
  }

  unDelete(personelUserFileDTO: PersonelUserFileDTO) {
    this.personelUserFileService.update(personelUserFileDTO).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile geri alındı');
        this.ngOnInit();
      },
      (responseError) => console.error
    );
  }

  unDeleteAll() {
    this.personelUserFileDTOs.forEach((personelUserFileDTO) => {
      this.personelUserFileService.update(personelUserFileDTO).subscribe(
        (response) => {},
        (responseError) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  terminate(personelUserFileDTO: PersonelUserFileDTO) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.personelUserFileService.terminate(personelUserFileDTO).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile kalıcı olarak silindi');
        this.ngOnInit();
      },
      (responseError) => console.log(responseError)
    );
  }

  terminateAll() {
    if (!confirm('Tümünü Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.personelUserFileDTOs.forEach((personelUserFileDTO) => {
      this.personelUserFileService.terminate(personelUserFileDTO).subscribe(
        (response) => {},
        (responseError) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
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
