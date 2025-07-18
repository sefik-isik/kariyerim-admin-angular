import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminModel } from '../../../models/auth/adminModel';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { PersonelUserImageDTO } from '../../../models/dto/personelUserImageDTO';
import { FilterPersonelUserImageByUserPipe } from '../../../pipes/FilterPersonelUserImageByUser.pipe';
import { AuthService } from '../../../services/auth.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUserImageService } from '../../../services/personelUserImage.service';
import { PersonelUserImageDetailComponent } from '../personelUserImageDetail/personelUserImageDetail.component';
import { PersonelUserImageUpdateComponent } from '../personelUserImageUpdate/personelUserImageUpdate.component';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-personelUserImageList',
  templateUrl: './personelUserImageList.component.html',
  styleUrls: ['./personelUserImageList.component.css'],
  imports: [CommonModule, FormsModule, FilterPersonelUserImageByUserPipe],
})
export class PersonelUserImageListComponent implements OnInit {
  personelUserImageDTOs: PersonelUserImageDTO[] = [];
  personelUserDTOs: PersonelUserDTO[] = [];
  dataLoaded = false;
  filter1: string = '';
  admin: boolean = false;
  isPersonelUser: boolean = true;
  componentTitle = 'Personel User Images';

  constructor(
    private toastrService: ToastrService,
    private personelUserImageService: PersonelUserImageService,
    private personelUserService: PersonelUserService,
    private adminService: AdminService,
    private localStorageService: LocalStorageService,
    private modalService: NgbModal,
    private authService: AuthService,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
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
        this.validationService.handleSuccesses(response);
        this.getPersonelUsers(response);
        this.getPersonelUserImages(response);
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getPersonelUsers(adminModel: AdminModel) {
    this.personelUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.personelUserDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getPersonelUserImages(adminModel: AdminModel) {
    this.personelUserImageService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.personelUserImageDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  updateProfilImage(personelUserImage: PersonelUserImageDTO) {
    if (!confirm('Ana Resim Olarak Güncellemek istediğinize emin misiniz?')) {
      this.toastrService.info('Güncelleme İşlemi İptal Edildi');
      return;
    }
    personelUserImage.isProfilImage = true;
    this.personelUserImageService.update(personelUserImage).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.toastrService.success('Başarı ile güncellendi');
        this.ngOnInit();
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  delete(personelUserImage: PersonelUserImageDTO) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.personelUserImageService.delete(personelUserImage).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.toastrService.success('Başarı ile silindi');
        this.ngOnInit();
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  deleteAll() {
    if (!confirm('Tümünü Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.personelUserImageDTOs.forEach((personelUserImageDTO) => {
      this.personelUserImageService.delete(personelUserImageDTO).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
        },
        (responseError) => this.validationService.handleErrors(responseError)
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
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.personelUserImageDTO = personelUserImageDTO;
  }

  openDetail(personelUserImageDTO: PersonelUserImageDTO) {
    const modalRef = this.modalService.open(PersonelUserImageDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
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
