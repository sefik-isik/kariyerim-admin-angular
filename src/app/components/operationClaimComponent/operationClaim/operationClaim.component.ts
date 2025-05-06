import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { OperationClaim } from '../../../models/operationClaim';
import { OperationClaimService } from '../../../services/operationClaim.service';

@Component({
  selector: 'app-operationClaim',
  templateUrl: './operationClaim.component.html',
  styleUrls: ['./operationClaim.component.css'],
  imports: [CommonModule, FormsModule, RouterLink],
})
export class OperationClaimComponent implements OnInit {
  operationClaims: OperationClaim[] = [];
  componentTitle = 'Operation Claims';

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private operationClaimService: OperationClaimService
  ) {}

  ngOnInit() {
    this.getOperationClaims();
  }

  getOperationClaims() {
    this.operationClaimService.getAll().subscribe(
      (response) => {
        this.operationClaims = response.data;
      },
      (error) => console.error
    );
  }

  delete(operationClaim: OperationClaim) {
    if (!this.authService.isAdmin('status')) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.operationClaimService.delete(operationClaim).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile silindi');
      },
      (error) => console.error
    );
  }

  deleteAll() {
    if (!this.authService.isAdmin('status')) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Tümünü Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.operationClaims.forEach((operationClaim) => {
      this.operationClaimService.delete(operationClaim).subscribe(
        (response) => {},
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }
}
