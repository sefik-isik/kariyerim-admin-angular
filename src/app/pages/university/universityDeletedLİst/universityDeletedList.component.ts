import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UniversityService } from '../../../services/university.service';
import { FilterUniversityPipe } from '../../../pipes/filterUniversity.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UniversityUpdateComponent } from '../universityUpdate/universityUpdate.component';
import { UniversityDetailComponent } from '../universityDetail/universityDetail.component';
import { UniversityDTO } from '../../../models/universityDTO';

@Component({
  selector: 'app-universityDeletedList',
  templateUrl: './universityDeletedList.component.html',
  styleUrls: ['./universityDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterUniversityPipe],
})
export class UniversityDeletedListComponent implements OnInit {
  universityDTOs: UniversityDTO[] = [];
  componentTitle = 'University Deleted List';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private universityService: UniversityService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getUniversities();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getUniversities();
      }
    });
  }

  getUniversities() {
    this.universityService.getDeletedAllDTO().subscribe(
      (response) => {
        this.universityDTOs = response.data;
      },
      (error) => console.error
    );
  }

  unDelete(universityDTOs: UniversityDTO) {
    this.universityService.update(universityDTOs).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (error) => console.error
    );
  }

  unDeleteAll() {
    this.universityDTOs.forEach((universityDTO) => {
      this.universityService.update(universityDTO).subscribe(
        (response) => {},
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  open(universityDTO: UniversityDTO) {
    const modalRef = this.modalService.open(UniversityUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.universityDTO = universityDTO;
  }

  openDetail(universityDTO: UniversityDTO) {
    const modalRef = this.modalService.open(UniversityDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.universityDTO = universityDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.getUniversities();
  }
}
