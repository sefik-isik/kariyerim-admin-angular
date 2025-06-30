import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { LanguageService } from '../../../services/language.service';
import { Language } from '../../../models/component/language';
import { FilterLanguagePipe } from '../../../pipes/filterLanguage.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageUpdateComponent } from '../languageUpdate/languageUpdate.component';
import { LanguageDetailComponent } from '../languageDetail/languageDetail.component';

@Component({
  selector: 'app-languageList',
  templateUrl: './languageList.component.html',
  styleUrls: ['./languageList.component.css'],
  imports: [CommonModule, FormsModule, FilterLanguagePipe],
})
export class LanguageListComponent implements OnInit {
  languages: Language[] = [];

  componentTitle = 'Languages';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
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
    this.languageService.getAll().subscribe(
      (response) => {
        this.languages = response.data;
      },
      (responseError) => console.error
    );
  }

  delete(language: Language) {
    if (!this.authService.isAdmin('status')) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.languageService.delete(language).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile silindi');
      },
      (responseError) => console.error
    );
  }

  deleteAll() {
    if (!this.authService.isAdmin('status')) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Tümünü Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.languages.forEach((language) => {
      this.languageService.delete(language).subscribe(
        (response) => {},
        (responseError) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  open(language: Language) {
    const modalRef = this.modalService.open(LanguageUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.language = language;
  }

  openDetail(language: Language) {
    const modalRef = this.modalService.open(LanguageDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
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
