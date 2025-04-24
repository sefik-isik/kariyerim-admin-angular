import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LanguageLevel } from '../../../models/languageLevel';
import { LanguageLevelService } from '../../../services/languageLevel.service';

@Component({
  selector: 'app-languageLevelOfDeleted',
  templateUrl: './languageLevelOfDeleted.component.html',
  styleUrls: ['./languageLevelOfDeleted.component.css'],
  imports: [CommonModule, FormsModule, RouterLink],
})
export class LanguageLevelOfDeletedComponent implements OnInit {
  languageLevels: LanguageLevel[] = [];
  componentTitle = 'Language Levels Of Deleted';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private languageLevelService: LanguageLevelService
  ) {}

  ngOnInit() {
    this.getLanguageLevels();
  }

  getLanguageLevels() {
    this.languageLevelService.getAll().subscribe(
      (response) => {
        this.languageLevels = response.data.filter(
          (f) => f.deletedDate != null
        );
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

  clearInput1() {
    this.filter1 = null;
    this.getLanguageLevels();
  }
}
