import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SectorDescriptionDTO } from '../../../models/dto/sectorDescriptionDTO';

@Component({
  selector: 'app-sectorDescriptionDetail',
  templateUrl: './sectorDescriptionDetail.component.html',
  styleUrls: ['./sectorDescriptionDetail.component.css'],
  imports: [CommonModule],
})
export class SectorDescriptionDetailComponent implements OnInit {
  @Input() sectorDescriptionDTO: SectorDescriptionDTO;
  componentTitle: string = 'Position Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
