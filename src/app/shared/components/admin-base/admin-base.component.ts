import {Component, OnInit} from '@angular/core';
import {AppRoutingPath} from '../../../app-routing.path';

@Component({
  selector: 'app-admin-base',
  templateUrl: './admin-base.component.html',
  styleUrls: ['./admin-base.component.scss']
})
export class AdminBaseComponent implements OnInit {

  constructor() {
  }

  routes = AppRoutingPath;

  ngOnInit(): void {
  }

}
