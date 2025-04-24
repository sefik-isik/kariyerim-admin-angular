import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelMenu } from '../../models/modelMenu';
import { ModelMenuService } from '../../services/modelMenu.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-modelMenu',
  templateUrl: './modelMenu.component.html',
  styleUrls: ['./modelMenu.component.css'],
  imports: [CommonModule, RouterLink],
})
export class ModelMenuComponent implements OnInit {
  modelMenus: ModelMenu[];
  modelMenuFirst: ModelMenu;
  currentModelMenu: ModelMenu;
  dataLoaded = false;

  constructor(private modelMenuService: ModelMenuService) {}

  ngOnInit(): void {
    this.getModelMenus();
  }

  getModelMenus() {
    this.modelMenuService.getAll().subscribe(
      (response) => {
        this.modelMenus = response.data.filter((f) => f.deletedDate == null);
        this.dataLoaded = true;

        this.getModelMenuClass(this.modelMenuFirst);
      },
      (error) => console.error
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
