import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserOperationClaimDTO } from '../../../models/dto/userOperationClaimDTO';

@Component({
  selector: 'app-userOperationClaimDetail',
  templateUrl: './userOperationClaimDetail.component.html',
  styleUrls: ['./userOperationClaimDetail.component.css'],
  imports: [CommonModule],
})
export class UserOperationClaimDetailComponent implements OnInit {
  @Input() userOperationClaimDTO: UserOperationClaimDTO;
  componentTitle: string = 'User Operation Claim Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
