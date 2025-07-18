import { FacultyService } from '../../../services/faculty.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { Faculty } from '../../../models/component/faculty';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Experience } from '../../../models/component/experience';
import { ExperienceService } from '../../../services/experience.service';
import { FilterExperiencePipe } from '../../../pipes/filterExperience.pipe';
import { ExperienceUpdateComponent } from '../experienceUpdate/experienceUpdate.component';
import { ExperienceDetailComponent } from '../experienceDetail/experienceDetail.component';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-experienceList',
  templateUrl: './experienceList.component.html',
  styleUrls: ['./experienceList.component.css'],
  imports: [CommonModule, FormsModule, FilterExperiencePipe],
})
export class ExperienceListComponent implements OnInit {
  experiences: Experience[] = [];
  componentTitle = 'Experiences';
  filter1: string;
  admin: boolean = false;

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private experienceService: ExperienceService,
    private modalService: NgbModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getExperiences();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getExperiences();
      }
    });
  }

  getExperiences() {
    this.experienceService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.experiences = response.data.filter((f) => f.experienceName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  delete(experience: Experience) {
    if (!this.authService.isAdmin()) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.experienceService.delete(experience).subscribe(
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
    this.experiences.forEach((experience) => {
      this.experienceService.delete(experience).subscribe(
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
