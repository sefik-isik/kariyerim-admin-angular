import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminModel } from '../../../models/auth/adminModel';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { PersonelUserFileDTO } from '../../../models/dto/personelUserFileDTO';
import { FilterPersonelUserFileByUserPipe } from '../../../pipes/filterPersonelUserFileByUser.pipe';
import { AuthService } from '../../../services/auth.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUserFileService } from '../../../services/personelUserFile.service';
import { PersonelUserFileDetailComponent } from '../personelUserFileDetail/personelUserFileDetail.component';
import { PersonelUserFileUpdateComponent } from '../personelUserFileUpdate/personelUserFileUpdate.component';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-personelUserFileDeletedList',
  templateUrl: './personelUserFileDeletedList.component.html',
  styleUrls: ['./personelUserFileDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterPersonelUserFileByUserPipe],
})
export class PersonelUserFileDeletedListComponent implements OnInit {
  personelUserFileDTOs: PersonelUserFileDTO[] = [];
  personelUserDTOs: PersonelUserDTO[] = [];
  dataLoaded = false;
  filter1: string = '';
  admin: boolean = false;
  isPersonelUser: boolean = true;
  componentTitle = 'Personel User Files';

  constructor(
    private personelUserFileService: PersonelUserFileService,
    private toastrService: ToastrService,
    private adminService: AdminService,
    private personelUserService: PersonelUserService,
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
        this.getPersonelUserFiles(response);
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

  getPersonelUserFiles(adminModel: AdminModel) {
    this.personelUserFileService.getDeletedAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.personelUserFileDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDelete(personelUserFileDTO: PersonelUserFileDTO) {
    this.personelUserFileService.update(personelUserFileDTO).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.toastrService.success('Başarı ile geri alındı');
        this.ngOnInit();
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDeleteAll() {
    this.personelUserFileDTOs.forEach((personelUserFileDTO) => {
      this.personelUserFileService.update(personelUserFileDTO).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
        },
        (responseError) => this.validationService.handleErrors(responseError)
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
        this.validationService.handleSuccesses(response);
        this.toastrService.success('Başarı ile kalıcı olarak silindi');
        this.ngOnInit();
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  terminateAll() {
    if (!confirm('Tümünü Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.personelUserFileDTOs.forEach((personelUserFileDTO) => {
      this.personelUserFileService.terminate(personelUserFileDTO).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
        },
        (responseError) => this.validationService.handleErrors(responseError)
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
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.personelUserFileDTO = personelUserFileDTO;
  }

  openDetail(personelUserFileDTO: PersonelUserFileDTO) {
    const modalRef = this.modalService.open(PersonelUserFileDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
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
