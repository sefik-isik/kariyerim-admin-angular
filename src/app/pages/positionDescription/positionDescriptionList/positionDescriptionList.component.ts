import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PositionDescription } from '../../../models/component/positionDescription';
import { PositionDescriptionDTO } from '../../../models/dto/positionDescriptionDTO';
import { FilterPositionDescriptionPipe } from '../../../pipes/filterPositionDescription.pipe';
import { AuthService } from '../../../services/auth.service';
import { PositionDescriptionService } from '../../../services/positionDescription.service';
import { ValidationService } from '../../../services/validation.service';
import { PositionDescriptionDetailComponent } from '../positionDescriptionDetail/positionDescriptionDetail.component';
import { PositionDescriptionUpdateComponent } from '../positionDescriptionUpdate/positionDescriptionUpdate.component';
import { Position } from '../../../models/component/position';
import { PositionService } from '../../../services/position.service';

@Component({
  selector: 'app-positionDescriptionList',
  templateUrl: './positionDescriptionList.component.html',
  styleUrls: ['./positionDescriptionList.component.css'],
  imports: [CommonModule, FormsModule, FilterPositionDescriptionPipe],
})
export class PositionDescriptionListComponent implements OnInit {
  positionDescriptionDTOs: PositionDescriptionDTO[] = [];
  positions: Position[] = [];
  dataLoaded = false;
  filter1 = '';
  componentTitle = 'Position Description Deleted List';
  admin: boolean = false;

  constructor(
    private positionDescriptionService: PositionDescriptionService,
    private positionService: PositionService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private authService: AuthService,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getPositionDescriptions();
    this.getPositions();

    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getPositionDescriptions();
      }
    });
  }

  getPositionDescriptions() {
    this.positionDescriptionService.getAllDTO().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.positionDescriptionDTOs = response.data.filter(
          (f) => f.positionName != '-'
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getPositions() {
    this.positionService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.positions = response.data.filter((f) => f.positionName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  delete(positionDescription: PositionDescription) {
    if (!this.authService.isAdmin()) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.positionDescriptionService.delete(positionDescription).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.ngOnInit();
        this.toastrService.success('Başarı ile silindi');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  deleteAll() {
    if (!this.authService.isAdmin()) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Tümünü Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.positionDescriptionDTOs.forEach((positionDescription) => {
      this.positionDescriptionService.delete(positionDescription).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  open(positionDescriptionDTO: PositionDescriptionDTO) {
    const modalRef = this.modalService.open(
      PositionDescriptionUpdateComponent,
      {
        size: 'lg',
        backdrop: 'static',
        keyboard: true,
        centered: true,
        scrollable: false,
        windowClass: 'modal-holder',
        backdropClass: 'modal-backdrop',
      }
    );
    modalRef.componentInstance.positionDescriptionDTO = positionDescriptionDTO;
  }

  openDetail(positionDescriptionDTO: PositionDescriptionDTO) {
    const modalRef = this.modalService.open(
      PositionDescriptionDetailComponent,
      {
        size: 'lg',
        backdrop: 'static',
        keyboard: true,
        centered: true,
        scrollable: false,
        windowClass: 'modal-holder',
        backdropClass: 'modal-backdrop',
      }
    );
    modalRef.componentInstance.positionDescriptionDTO = positionDescriptionDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.getPositionDescriptions();
  }
}
