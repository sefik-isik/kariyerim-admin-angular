import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from '../../../services/language.service';
import { Language } from '../../../models/language';
import { FilterLanguagePipe } from '../../../pipes/filterLanguage.pipe';

@Component({
  selector: 'app-languageOfDeleted',
  templateUrl: './languageOfDeleted.component.html',
  styleUrls: ['./languageOfDeleted.component.css'],
  imports: [CommonModule, FormsModule, RouterLink, FilterLanguagePipe],
})
export class LanguageOfDeletedComponent implements OnInit {
  languages: Language[] = [];
  componentTitle = 'Languages Of Deleted';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.getLanguages();
  }

  getLanguages() {
    this.languageService.getAll().subscribe(
      (response) => {
        this.languages = response.data.filter((f) => f.deletedDate != null);
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

  clearInput1() {
    this.filter1 = null;
    this.getLanguages();
  }
}
