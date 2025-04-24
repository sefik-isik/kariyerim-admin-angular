import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from '../../../models/operationClaim';
import { OperationClaimService } from '../../../services/operationClaim.service';

@Component({
  selector: 'app-operationClaimOfDeleted',
  templateUrl: './operationClaimOfDeleted.component.html',
  styleUrls: ['./operationClaimOfDeleted.component.css'],
  imports: [CommonModule, FormsModule, RouterLink],
})
export class OperationClaimOfDeletedComponent implements OnInit {
  operationClaims: OperationClaim[] = [];
  componentTitle = 'Operation Claims Of Deleted';

  constructor(
    private toastrService: ToastrService,
    private operationClaimService: OperationClaimService
  ) {}

  ngOnInit() {
    this.getOperationClaims();
  }

  getOperationClaims() {
    this.operationClaimService.getAll().subscribe(
      (response) => {
        this.operationClaims = response.data.filter(
          (f) => f.deletedDate != null
        );
      },
      (error) => console.error
    );
  }

  unDelete(operationClaim: OperationClaim) {
    this.operationClaimService.update(operationClaim).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (error) => console.error
    );
  }

  unDeleteAll() {
    this.operationClaims.forEach((operationClaim) => {
      this.operationClaimService.update(operationClaim).subscribe(
        (response) => {},
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }
}
