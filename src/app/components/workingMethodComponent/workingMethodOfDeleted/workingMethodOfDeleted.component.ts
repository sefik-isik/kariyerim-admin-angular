import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WorkingMethod } from '../../../models/workingMethod';
import { WorkingMethodService } from '../../../services/workingMethod.service';

@Component({
  selector: 'app-workingMethodOfDeleted',
  templateUrl: './workingMethodOfDeleted.component.html',
  styleUrls: ['./workingMethodOfDeleted.component.css'],
  imports: [CommonModule, FormsModule, RouterLink],
})
export class WorkingMethodOfDeletedComponent implements OnInit {
  workingMethods: WorkingMethod[] = [];
  componentTitle = 'Working Methods Of Deleted';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private workingMethodService: WorkingMethodService
  ) {}

  ngOnInit() {
    this.getWorkingMethods();
  }

  getWorkingMethods() {
    this.workingMethodService.getAll().subscribe(
      (response) => {
        this.workingMethods = response.data.filter(
          (f) => f.deletedDate != null
        );
      },
      (error) => console.error
    );
  }

  unDelete(workingMethod: WorkingMethod) {
    this.workingMethodService.update(workingMethod).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (error) => console.error
    );
  }

  unDeleteAll() {
    this.workingMethods.forEach((workingMethod) => {
      this.workingMethodService.update(workingMethod).subscribe(
        (response) => {},
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  clearInput1() {
    this.filter1 = null;
    this.getWorkingMethods();
  }
}
