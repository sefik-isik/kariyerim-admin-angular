import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from '../../../services/language.service';
import { Language } from '../../../models/language';
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
      (error) => console.error
    );
  }

  unDelete(language: Language) {
    this.languageService.update(language).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (error) => console.error
    );
  }

  unDeleteAll() {
    this.languages.forEach((language) => {
      this.languageService.update(language).subscribe(
        (response) => {},
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
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
