import { Component } from '@angular/core';
import { ModelMenuListComponent } from '../modelMenuList/modelMenuList.component';

@Component({
  selector: 'app-modelMenu-list-tab',
  template: `
    <div class="card-body"><app-modelMenuList></app-modelMenuList></div>
  `,
  imports: [ModelMenuListComponent],
})
export class ModelMenuListTab {}
