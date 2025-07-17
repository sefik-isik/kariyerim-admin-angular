import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from '../../../services/language.service';
import { Language } from '../../../models/component/language';
import { FilterLanguagePipe } from '../../../pipes/filterLanguage.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageUpdateComponent } from '../languageUpdate/languageUpdate.component';
import { LanguageDetailComponent } from '../languageDetail/languageDetail.component';

@Component({
  selector: 'app-languageDeletedList',
  templateUrl: './languageDeletedList.component.html',
  styleUrls: ['./languageDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterLanguagePipe],
})
export class LanguageDeletedListComponent implements OnInit {
  languages: Language[] = [];
  componentTitle = 'Languages Deleted List';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private languageService: LanguageService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getLanguages();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getLanguages();
      }
    });
  }

  getLanguages() {
    this.languageService.getDeletedAll().subscribe(
      (response) => {
        this.languages = response.data;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  unDelete(language: Language) {
    this.languageService.update(language).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  unDeleteAll() {
    this.languages.forEach((language) => {
      this.languageService.update(language).subscribe(
        (response) => {},
        (responseError) => this.toastrService.error(responseError.error.message)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  terminate(language: Language) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.languageService.terminate(language).subscribe(
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

    this.languages.forEach((language) => {
      this.languageService.terminate(language).subscribe(
        (response) => {},
        (responseError) => this.toastrService.error(responseError.error.message)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
    }, 500);
  }

  open(language: Language) {
    const modalRef = this.modalService.open(LanguageUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.language = language;
  }

  openDetail(language: Language) {
    const modalRef = this.modalService.open(LanguageDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.language = language;
  }

  clearInput1() {
    this.filter1 = null;
    this.getLanguages();
  }
}
