import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { LanguageLevelService } from '../../../services/languageLevel.service';
import { LanguageLevel } from '../../../models/languageLevel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageLevelUpdateComponent } from '../languageLevelUpdate/languageLevelUpdate.component';
import { LanguageLevelDetailComponent } from '../languageLevelDetail/languageLevelDetail.component';

@Component({
  selector: 'app-languageLevelList',
  templateUrl: './languageLevelList.component.html',
  styleUrls: ['./languageLevelList.component.css'],
  imports: [CommonModule, FormsModule],
})
export class LanguageLevelListComponent implements OnInit {
  languageLevels: LanguageLevel[] = [];

  componentTitle = 'Language Levels';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private languageLevelService: LanguageLevelService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
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
        this.languageLevels = response.data;
      },
      (error) => console.error
    );
  }

  delete(languageLevel: LanguageLevel) {
    if (!this.authService.isAdmin('status')) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.languageLevelService.delete(languageLevel).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile silindi');
      },
      (error) => console.error
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
    this.languageLevels.forEach((languageLevel) => {
      this.languageLevelService.delete(languageLevel).subscribe(
        (response) => {},
        (error) => console.error
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
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.languageLevel = languageLevel;
  }

  openDetail(languageLevel: LanguageLevel) {
    const modalRef = this.modalService.open(LanguageLevelDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
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
