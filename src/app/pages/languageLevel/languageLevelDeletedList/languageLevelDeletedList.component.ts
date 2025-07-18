import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageLevel } from '../../../models/component/languageLevel';
import { LanguageLevelService } from '../../../services/languageLevel.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageLevelUpdateComponent } from '../languageLevelUpdate/languageLevelUpdate.component';
import { LanguageLevelDetailComponent } from '../languageLevelDetail/languageLevelDetail.component';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-languageLevelDeletedList',
  templateUrl: './languageLevelDeletedList.component.html',
  styleUrls: ['./languageLevelDeletedList.component.css'],
  imports: [CommonModule, FormsModule],
})
export class LanguageLevelDeletedListComponent implements OnInit {
  languageLevels: LanguageLevel[] = [];

  componentTitle = 'Language Levels Deleted List';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private languageLevelService: LanguageLevelService,
    private modalService: NgbModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getLanguageLevels();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getLanguageLevels();
      }
    });
  }

  getLanguageLevels() {
    this.languageLevelService.getDeletedAll().subscribe(
      (response) => {
        this.languageLevels = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDelete(languageLevel: LanguageLevel) {
    this.languageLevelService.update(languageLevel).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDeleteAll() {
    this.languageLevels.forEach((languageLevel) => {
      this.languageLevelService.update(languageLevel).subscribe(
        (response) => {},
        (responseError) => this.validationService.handleErrors(responseError)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  terminate(languageLevel: LanguageLevel) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.languageLevelService.terminate(languageLevel).subscribe(
      (response) => {
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

    this.languageLevels.forEach((languageLevel) => {
      this.languageLevelService.terminate(languageLevel).subscribe(
        (response) => {},
        (responseError) => this.validationService.handleErrors(responseError)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
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
    this.getLanguageLevels();
  }
}
