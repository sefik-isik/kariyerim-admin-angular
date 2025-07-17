import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Experience } from '../../../models/component/experience';
import { ExperienceService } from '../../../services/experience.service';
import { ExperienceDetailComponent } from '../experienceDetail/experienceDetail.component';
import { ExperienceUpdateComponent } from '../experienceUpdate/experienceUpdate.component';
import { FilterExperiencePipe } from '../../../pipes/filterExperience.pipe';

@Component({
  selector: 'app-experienceDeletedList',
  templateUrl: './experienceDeletedList.component.html',
  styleUrls: ['./experienceDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterExperiencePipe],
})
export class ExperienceDeletedListComponent implements OnInit {
  experiences: Experience[] = [];
  componentTitle = 'Experiences';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private experienceService: ExperienceService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getExperiences();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getExperiences();
      }
    });
  }

  getExperiences() {
    this.experienceService.getDeletedAll().subscribe(
      (response) => {
        this.experiences = response.data;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  unDelete(experience: Experience) {
    this.experienceService.update(experience).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  unDeleteAll() {
    this.experiences.forEach((experience) => {
      this.experienceService.update(experience).subscribe(
        (response) => {},
        (responseError) => this.toastrService.error(responseError.error.message)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  terminate(experience: Experience) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.experienceService.terminate(experience).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile kalıcı olarak silindi');
        this.ngOnInit();
      },
      (responseError) => console.log(responseError)
    );
  }

  terminateAll() {
    if (!confirm('Tümünü Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.experiences.forEach((experience) => {
      this.experienceService.terminate(experience).subscribe(
        (response) => {},
        (responseError) => this.toastrService.error(responseError.error.message)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
    }, 500);
  }

  open(experience: Experience) {
    const modalRef = this.modalService.open(ExperienceUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.experience = experience;
  }

  openDetail(experience: Experience) {
    const modalRef = this.modalService.open(ExperienceDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.experience = experience;
  }

  clearInput1() {
    this.filter1 = null;
    this.getExperiences();
  }
}
