import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PositionDescription } from '../../../models/component/positionDescription';
import { PositionDescriptionDTO } from '../../../models/dto/positionDescriptionDTO';
import { FilterPositionDescriptionPipe } from '../../../pipes/filterPositionDescription.pipe';
import { PositionDescriptionService } from '../../../services/positionDescription.service';
import { ValidationService } from '../../../services/validation.service';
import { PositionDescriptionDetailComponent } from '../positionDescriptionDetail/positionDescriptionDetail.component';
import { PositionDescriptionUpdateComponent } from '../positionDescriptionUpdate/positionDescriptionUpdate.component';

@Component({
  selector: 'app-positionDescriptionDeletedList',
  templateUrl: './positionDescriptionDeletedList.component.html',
  styleUrls: ['./positionDescriptionDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterPositionDescriptionPipe],
})
export class PositionDescriptionDeletedListComponent implements OnInit {
  positionDescriptionDTOs: PositionDescriptionDTO[] = [];
  dataLoaded = false;
  filter1 = '';
  componentTitle = 'Position Description Deleted List';

  constructor(
    private positionDescriptionService: PositionDescriptionService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getPositionDescriptions();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getPositionDescriptions();
      }
    });
  }

  getPositionDescriptions() {
    this.positionDescriptionService.getDeletedAllDTO().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.positionDescriptionDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDelete(positionDescription: PositionDescription) {
    this.positionDescriptionService.update(positionDescription).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDeleteAll() {
    this.positionDescriptionDTOs.forEach((positionDescriptionDTO) => {
      this.positionDescriptionService.update(positionDescriptionDTO).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  terminate(positionDescriptionDTO: PositionDescriptionDTO) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.positionDescriptionService.terminate(positionDescriptionDTO).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.toastrService.success('Başarı ile kalıcı olarak silindi');
        this.ngOnInit();
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  terminateAll() {
    if (!confirm('Tümünü Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.positionDescriptionDTOs.forEach((positionDescriptionDTO) => {
      this.positionDescriptionService
        .terminate(positionDescriptionDTO)
        .subscribe(
          (response) => {
            this.validationService.handleSuccesses(response);
          },
          (responseError) => this.validationService.handleErrors(responseError)
        );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
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
