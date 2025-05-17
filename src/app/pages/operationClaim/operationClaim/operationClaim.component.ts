import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OperationClaimAddComponent } from '../operationClaimAdd/operationClaimAdd.component';

@Component({
  selector: 'app-operationClaim',
  templateUrl: './operationClaim.component.html',
  styleUrls: ['./operationClaim.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class OperationClaimComponent {
  componentTitle = 'Operation Claims';
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(OperationClaimAddComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
  }
}
