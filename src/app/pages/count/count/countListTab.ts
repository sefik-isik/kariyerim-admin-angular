import { Component } from '@angular/core';
import { CountListComponent } from '../countList/countList.component';

@Component({
  selector: 'app-count-list-tab',
  template: ` <div class="card-body"><app-countList></app-countList></div> `,
  imports: [CountListComponent],
})
export class CountListTab {}
