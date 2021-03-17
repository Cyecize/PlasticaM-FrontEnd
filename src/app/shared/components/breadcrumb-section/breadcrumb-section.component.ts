import {Component, Input, OnInit} from '@angular/core';
import {BreadcrumbModel} from './breadcrumb.model';

@Component({
  selector: 'app-breadcrumb-section',
  templateUrl: './breadcrumb-section.component.html',
  styleUrls: ['./breadcrumb-section.component.scss']
})
export class BreadcrumbSectionComponent implements OnInit {

  @Input()
  items: BreadcrumbModel[] = [];

  constructor() {

  }

  ngOnInit(): void {
  }

}
