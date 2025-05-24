import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UniversityDTO } from '../../../models/universityDTO';

@Component({
  selector: 'app-universityDetail',
  templateUrl: './universityDetail.component.html',
  styleUrls: ['./universityDetail.component.css'],
  imports: [CommonModule],
})
export class UniversityDetailComponent implements OnInit {
  @Input() universityDTO: UniversityDTO;
  componentTitle: string = 'University Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
