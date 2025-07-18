import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { LanguageLevelService } from '../../../services/languageLevel.service';
import { LanguageLevel } from '../../../models/component/languageLevel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageLevelUpdateComponent } from '../languageLevelUpdate/languageLevelUpdate.component';
import { LanguageLevelDetailComponent } from '../languageLevelDetail/languageLevelDetail.component';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-languageLevelList',
  templateUrl: './languageLevelList.component.html',
  styleUrls: ['./languageLevelList.component.css'],
  imports: [CommonModule, FormsModule],
})
export class LanguageLevelListComponent implements OnInit {
  languageLevels: LanguageLevel[] = [];
  admin: boolean = false;
  componentTitle = 'Language Levels';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private languageLevelService: LanguageLevelService,
    private modalService: NgbModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getFaculties();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getFaculties();
      }
    });
  }

  getFaculties() {
    this.languageLevelService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.languageLevels = response.data.filter((f) => f.levelTitle != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  delete(languageLevel: LanguageLevel) {
    if (!this.authService.isAdmin()) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.languageLevelService.delete(languageLevel).subscribe(
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
    this.languageLevels.forEach((languageLevel) => {
      this.languageLevelService.delete(languageLevel).subscribe(
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

  open(languageLevel: LanguageLevel) {
    const modalRef = this.modalService.open(LanguageLevelUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.languageLevel = languageLevel;
  }

  openDetail(languageLevel: LanguageLevel) {
    const modalRef = this.modalService.open(LanguageLevelDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.languageLevel = languageLevel;
  }

  clearInput1() {
    this.filter1 = null;
    this.getFaculties();
  }
}
