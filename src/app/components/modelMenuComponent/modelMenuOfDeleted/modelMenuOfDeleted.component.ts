import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModelMenu } from '../../../models/modelMenu';
import { ModelMenuService } from '../../../services/modelMenu.service';
import { FilterModelMenuPipe } from '../../../pipes/filterModelMenu.pipe';

@Component({
  selector: 'app-modelMenuOfDeleted',
  templateUrl: './modelMenuOfDeleted.component.html',
  styleUrls: ['./modelMenuOfDeleted.component.css'],
  imports: [CommonModule, FormsModule, RouterLink, FilterModelMenuPipe],
})
export class ModelMenuOfDeletedComponent implements OnInit {
  modelMenus: ModelMenu[] = [];
  componentTitle = 'Model Menus Of Deleted';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private modelMenuService: ModelMenuService
  ) {}

  ngOnInit() {
    this.getModelMenus();
  }

  getModelMenus() {
    this.modelMenuService.getDeletedAll().subscribe(
      (response) => {
        this.modelMenus = response.data;
      },
      (error) => console.error
    );
  }

  unDelete(modelMenu: ModelMenu) {
    this.modelMenuService.update(modelMenu).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (error) => console.error
    );
  }

  unDeleteAll() {
    this.modelMenus.forEach((modelMenu) => {
      this.modelMenuService.update(modelMenu).subscribe(
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
    this.getModelMenus();
  }
}
