import { Component } from '@angular/core';
import { ModelMenuDeletedListComponent } from '../modelMenuDeletedLİst/modelMenuDeletedList.component';

@Component({
  selector: 'app-modelMenu-deleted-list-tab',
  template: `<div class="card-body">
    <app-modelMenuDeletedList></app-modelMenuDeletedList>
  </div> `,
  imports: [ModelMenuDeletedListComponent],
})
export class ModelMenuDeletedListTab {}
