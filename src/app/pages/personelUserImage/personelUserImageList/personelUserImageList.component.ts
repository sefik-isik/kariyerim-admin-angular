import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminModel } from '../../../models/auth/adminModel';
import { AdminService } from '../../../services/helperServices/admin.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserImageDTO } from '../../../models/dto/personelUserImageDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { FilterPersonelUserImageByUserPipe } from '../../../pipes/FilterPersonelUserImageByUser.pipe';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { PersonelUserImageService } from '../../../services/personelUserImage.service';
import { UserService } from '../../../services/user.service';
import { PersonelUserImageDetailComponent } from '../personelUserImageDetail/personelUserImageDetail.component';
import { PersonelUserImageUpdateComponent } from '../personelUserImageUpdate/personelUserImageUpdate.component';

@Component({
  selector: 'app-personelUserImageList',
  templateUrl: './personelUserImageList.component.html',
  styleUrls: ['./personelUserImageList.component.css'],
  imports: [CommonModule, FormsModule, FilterPersonelUserImageByUserPipe],
})
export class PersonelUserImageListComponent implements OnInit {
  personelUserImageDTOs: PersonelUserImageDTO[] = [];
  userDTOs: UserDTO[] = [];
  dataLoaded = false;
  filter1: string = '';

  componentTitle = 'Personel User Images';
  userId: string;

  personelUserImagesLenght: number = 0;

  constructor(
    private toastrService: ToastrService,
    private personelUserImageService: PersonelUserImageService,
    private userService: UserService,
    private adminService: AdminService,
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
        this.getPersonelUserImages(response);
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

  getPersonelUserImages(adminModel: AdminModel) {
    this.personelUserImageService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserImageDTOs = response.data;
        this.personelUserImagesLenght = this.personelUserImageDTOs.length;
      },
      (responseError) => console.error
    );
  }

  delete(personelUserImage: PersonelUserImageDTO) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.personelUserImageService.delete(personelUserImage).subscribe(
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
    this.personelUserImageDTOs.forEach((personelUserImageDTO) => {
      this.personelUserImageService.delete(personelUserImageDTO).subscribe(
        (response) => {},
        (responseError) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  open(personelUserImageDTO: PersonelUserImageDTO) {
    const modalRef = this.modalService.open(PersonelUserImageUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.personelUserImageDTO = personelUserImageDTO;
  }

  openDetail(personelUserImageDTO: PersonelUserImageDTO) {
    const modalRef = this.modalService.open(PersonelUserImageDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.personelUserImageDTO = personelUserImageDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.getAdminValues();
  }
}
