import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { University } from '../../../models/university';
import { UniversityService } from '../../../services/university.service';
import { FilterUniversityPipe } from '../../../pipes/filterUniversity.pipe';

@Component({
  selector: 'app-universityOfDeleted',
  templateUrl: './universityOfDeleted.component.html',
  styleUrls: ['./universityOfDeleted.component.css'],
  imports: [CommonModule, FormsModule, RouterLink, FilterUniversityPipe],
})
export class UniversityOfDeletedComponent implements OnInit {
  universities: University[] = [];

  componentTitle = 'University Of Deleted';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private universityService: UniversityService
  ) {}

  ngOnInit() {
    this.getUniversities();
  }

  getUniversities() {
    this.universityService.getDeletedAll().subscribe(
      (response) => {
        this.universities = response.data;
      },
      (error) => console.error
    );
  }

  unDelete(university: University) {
    this.universityService.update(university).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (error) => console.error
    );
  }

  unDeleteAll() {
    this.universities.forEach((university) => {
      this.universityService.update(university).subscribe(
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
    this.getUniversities();
  }
}
