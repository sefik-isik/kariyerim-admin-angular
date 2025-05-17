import { Component, OnInit } from '@angular/core';
import { ModelMenuMainComponent } from '../modelMenuMain/modelMenuMain.component';
import { RouterOutlet } from '@angular/router';
import { NaviComponent } from '../navi/navi.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [NaviComponent, ModelMenuMainComponent, RouterOutlet],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
