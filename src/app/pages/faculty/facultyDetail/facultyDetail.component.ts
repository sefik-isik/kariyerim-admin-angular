import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Faculty } from '../../../models/faculty';

@Component({
  selector: 'app-facultyDetail',
  templateUrl: './facultyDetail.component.html',
  styleUrls: ['./facultyDetail.component.css'],
  imports: [CommonModule],
})
export class FacultyDetailComponent implements OnInit {
  @Input() faculty: Faculty;
  componentTitle: string = 'Faculty Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
