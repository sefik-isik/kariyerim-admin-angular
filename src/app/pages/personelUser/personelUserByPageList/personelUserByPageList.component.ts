import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ToastrService } from 'ngx-toastr';
import { PageModel } from '../../../models/base/pageModel';
import { AuthService } from '../../../services/auth.service';
import { ValidationService } from '../../../services/validation.service';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { PersonelUserByPageDTO } from '../../../models/pageModel/personelUserByPageDTO';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUser } from '../../../models/component/personelUser';
import { PersonelUserUpdateComponent } from '../personelUserUpdate/personelUserUpdate.component';
import { PersonelUserDetailComponent } from '../personelUserDetail/personelUserDetail.component';
import { BoolenTextPipe } from '../../../pipes/boolenText.pipe';
import { GenderPipe } from '../../../pipes/gender.pipe';

@Component({
  selector: 'app-personelUserByPageList',
  templateUrl: './personelUserByPageList.component.html',
  styleUrls: ['./personelUserByPageList.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule,
    BoolenTextPipe,
    GenderPipe,
  ],
})
export class PersonelUserByPageListComponent implements OnInit {
  personelUserDTOs: PersonelUserDTO[] = [];
  personelUserByPageDTO: PersonelUserByPageDTO;
  admin: boolean = false;
  componentTitle = 'Personel User By Page List';
  filter1: string;

  pageModel: PageModel = {
    pageIndex: 0,
    pageSize: 20,
    sortColumn: 'PersonelUserName',
    sortOrder: 'asc',
  };

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private personelUserService: PersonelUserService,
    private modalService: NgbModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getPersonelUsersByPage();

    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getPersonelUsersByPage();
      }
    });
  }

  getPersonelUsersByPage() {
    this.personelUserService.getAllByPage(this.pageModel).subscribe(
      (response) => {
        this.personelUserByPageDTO = response.data;
        this.personelUserDTOs = this.personelUserByPageDTO.pageContacts;
        //console.log(this.personelUserByPageDTO.pageContacts);
        this.validationService.handleSuccesses(response);
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  sortByFirstName(sortValue: string) {
    this.pageModel.sortColumn = 'FirstName';
    if (sortValue === 'desc') {
      this.pageModel.sortOrder = 'desc';
    } else {
      this.pageModel.sortOrder = 'asc';
    }
    this.getPersonelUsersByPage();
  }

  sortByLastName(sortValue: string) {
    this.pageModel.sortColumn = 'LastName';
    if (sortValue === 'desc') {
      this.pageModel.sortOrder = 'desc';
    } else {
      this.pageModel.sortOrder = 'asc';
    }
    this.getPersonelUsersByPage();
  }

  sortByEmail(sortValue: string) {
    this.pageModel.sortColumn = 'Email';
    if (sortValue === 'desc') {
      this.pageModel.sortOrder = 'desc';
    } else {
      this.pageModel.sortOrder = 'asc';
    }
    this.getPersonelUsersByPage();
  }

  pageChanged($event: any) {
    this.pageModel.pageIndex = $event.page - 1;
    this.pageModel.pageSize = $event.itemsPerPage;
    this.getPersonelUsersByPage();
  }

  delete(personelUser: PersonelUser) {
    if (!this.authService.isAdmin()) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.personelUserService.delete(personelUser).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.ngOnInit();
        this.toastrService.success('Başarı ile silindi');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  deleteAll() {
    if (!this.authService.isAdmin()) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Tümünü Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.personelUserDTOs.forEach((personelUserDTO) => {
      this.personelUserService.delete(personelUserDTO).subscribe(
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

  open(personelUserDTO: PersonelUserDTO) {
    const modalRef = this.modalService.open(PersonelUserUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.personelUserDTO = personelUserDTO;
  }

  openDetail(personelUserDTO: PersonelUserDTO) {
    const modalRef = this.modalService.open(PersonelUserDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.personelUserDTO = personelUserDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.getPersonelUsersByPage();
  }
}
