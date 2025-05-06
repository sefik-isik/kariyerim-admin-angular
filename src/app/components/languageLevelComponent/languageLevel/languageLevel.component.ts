import { FacultyService } from './../../../services/faculty.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { LanguageLevelService } from '../../../services/languageLevel.service';
import { LanguageLevel } from '../../../models/languageLevel';

@Component({
  selector: 'app-languageLevel',
  templateUrl: './languageLevel.component.html',
  styleUrls: ['./languageLevel.component.css'],
  imports: [CommonModule, FormsModule, RouterLink],
})
export class LanguageLevelComponent implements OnInit {
  languageLevels: LanguageLevel[] = [];
  componentTitle = 'Language Levels';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private languageLevelService: LanguageLevelService
  ) {}

  ngOnInit() {
    this.getFaculties();
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

  clearInput1() {
    this.filter1 = null;
    this.getFaculties();
  }
}
