import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RegionDTO } from '../../../models/regionDTO';

@Component({
  selector: 'app-regionDetail',
  templateUrl: './regionDetail.component.html',
  styleUrls: ['./regionDetail.component.css'],
  imports: [CommonModule],
})
export class RegionDetailComponent implements OnInit {
  @Input() regionDTO: RegionDTO;
  componentTitle: string = 'Region Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
