import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageLevel } from '../../../models/languageLevel';
import { LanguageLevelService } from '../../../services/languageLevel.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageLevelUpdateComponent } from '../languageLevelUpdate/languageLevelUpdate.component';
import { LanguageLevelDetailComponent } from '../languageLevelDetail/languageLevelDetail.component';

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
    private modalService: NgbModal
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
      (error) => console.error
    );
  }

  unDelete(languageLevel: LanguageLevel) {
    this.languageLevelService.update(languageLevel).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (error) => console.error
    );
  }

  unDeleteAll() {
    this.languageLevels.forEach((languageLevel) => {
      this.languageLevelService.update(languageLevel).subscribe(
        (response) => {},
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
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
    this.getLanguageLevels();
  }
}
