import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelMenu } from '../../models/component/modelMenu';
import { ModelMenuService } from '../../services/modelMenu.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-modelMenuMain',
  templateUrl: './modelMenuMain.component.html',
  styleUrls: ['./modelMenuMain.component.css'],
  imports: [CommonModule, RouterLink],
})
export class ModelMenuMainComponent implements OnInit {
  modelMenus: ModelMenu[];
  modelMenuFirst: ModelMenu;
  currentModelMenu: ModelMenu;
  dataLoaded = false;

  constructor(
    private modelMenuService: ModelMenuService,
    private toastrService: ToastrService,
    private validationService: ValidationService
  ) {}

  ngOnInit(): void {
    this.getModelMenus();
  }

  getModelMenus() {
    this.modelMenuService.getAll().subscribe(
      (response) => {
        this.modelMenus = response.data.filter((f) => f.modelName != '-');
        this.dataLoaded = true;

        this.getModelMenuClass(this.modelMenuFirst);
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  setModelMenu(modelMenu: ModelMenu) {
    this.currentModelMenu = modelMenu;
  }

  getModelMenuClass(modelMenu: ModelMenu) {
    if (modelMenu == this.currentModelMenu) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
}
// + '/' + modelMenu.modelName + 'listtab'
