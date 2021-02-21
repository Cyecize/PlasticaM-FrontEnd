import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-contacts-section',
  templateUrl: './contacts-section.component.html',
  styleUrls: ['./contacts-section.component.scss']
})
export class ContactsSectionComponent implements OnInit {

  isMailFormVisible = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  onEmailButtonClick(): void {
    this.isMailFormVisible = !this.isMailFormVisible;
  }

}