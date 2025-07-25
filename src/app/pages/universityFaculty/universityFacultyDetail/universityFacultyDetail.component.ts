import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UniversityFaculty } from '../../../models/component/universityFaculty';

@Component({
  selector: 'app-universityFacultyDetail',
  templateUrl: './universityFacultyDetail.component.html',
  styleUrls: ['./universityFacultyDetail.component.css'],
  imports: [CommonModule],
})
export class UniversityFacultyDetailComponent implements OnInit {
  @Input() universityFaculty: UniversityFaculty;
  componentTitle: string = 'Position Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
