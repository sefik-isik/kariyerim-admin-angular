import { Component, OnInit } from '@angular/core';
import { ModelMenuComponent } from '../modelMenu/modelMenu.component';
import { RouterOutlet } from '@angular/router';
import { NaviComponent } from '../navi/navi.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [NaviComponent, ModelMenuComponent, RouterOutlet],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
