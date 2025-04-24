import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { ModelMenu } from '../../../models/modelMenu';
import { ModelMenuService } from '../../../services/modelMenu.service';
import { FilterModelMenuPipe } from '../../../pipes/filterModelMenu.pipe';

@Component({
  selector: 'app-modelMenuList',
  templateUrl: './modelMenuList.component.html',
  styleUrls: ['./modelMenuList.component.css'],
  imports: [CommonModule, FormsModule, RouterLink, FilterModelMenuPipe],
})
export class ModelMenuListComponent implements OnInit {
  modelMenus: ModelMenu[] = [];
  componentTitle = 'Model Menus';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private modelMenuService: ModelMenuService
  ) {}

  ngOnInit() {
    this.getModelMenus();
  }

  getModelMenus() {
    this.modelMenuService.getAll().subscribe(
      (response) => {
        this.modelMenus = response.data.filter((f) => f.deletedDate == null);
      },
      (error) => console.error
    );
  }

  delete(modelMenu: ModelMenu) {
    if (!this.authService.isAdmin('status')) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.modelMenuService.delete(modelMenu).subscribe(
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
    this.modelMenus.forEach((modelMenu) => {
      this.modelMenuService.delete(modelMenu).subscribe(
        (response) => {},
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  clearInput1() {
    this.filter1 = null;
    this.getModelMenus();
  }
}
