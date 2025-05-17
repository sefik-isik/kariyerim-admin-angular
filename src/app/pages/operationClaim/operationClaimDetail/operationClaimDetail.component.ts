import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OperationClaim } from '../../../models/operationClaim';

@Component({
  selector: 'app-operationClaimDetail',
  templateUrl: './operationClaimDetail.component.html',
  styleUrls: ['./operationClaimDetail.component.css'],
  imports: [CommonModule],
})
export class OperationClaimDetailComponent implements OnInit {
  @Input() operationClaim: OperationClaim;
  componentTitle: string = 'Operation Claim Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
