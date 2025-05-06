import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { LanguageService } from '../../../services/language.service';
import { Language } from '../../../models/language';
import { FilterLanguagePipe } from '../../../pipes/filterLanguage.pipe';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css'],
  imports: [CommonModule, FormsModule, RouterLink, FilterLanguagePipe],
})
export class LanguageComponent implements OnInit {
  languages: Language[] = [];
  componentTitle = 'Languages';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.getLanguages();
  }

  getLanguages() {
    this.languageService.getAll().subscribe(
      (response) => {
        this.languages = response.data;
      },
      (error) => console.error
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
    this.languages.forEach((language) => {
      this.languageService.delete(language).subscribe(
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
    this.getLanguages();
  }
}
