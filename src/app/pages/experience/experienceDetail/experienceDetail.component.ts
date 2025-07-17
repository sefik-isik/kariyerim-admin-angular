import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Experience } from '../../../models/component/experience';

@Component({
  selector: 'app-experienceDetail',
  templateUrl: './experienceDetail.component.html',
  styleUrls: ['./experienceDetail.component.css'],
  imports: [CommonModule],
})
export class ExperienceDetailComponent implements OnInit {
  @Input() experience: Experience;
  componentTitle: string = 'Experience Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
