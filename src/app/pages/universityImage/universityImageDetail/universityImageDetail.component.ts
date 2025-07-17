import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UniversityImage } from '../../../models/component/universityImage';

@Component({
  selector: 'app-universityImageDetail',
  templateUrl: './universityImageDetail.component.html',
  styleUrls: ['./universityImageDetail.component.css'],
  imports: [CommonModule],
})
export class UniversityImageDetailComponent implements OnInit {
  @Input() universityImage: UniversityImage;
  componentTitle: string = 'University Image Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
