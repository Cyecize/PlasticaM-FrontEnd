import {Component, Input, OnInit} from '@angular/core';
import {ObjectUtils} from '../../util/object-utils';

@Component({
  selector: 'app-contacts-section',
  templateUrl: './contacts-section.component.html',
  styleUrls: ['./contacts-section.component.scss']
})
export class ContactsSectionComponent implements OnInit {

  isMailFormVisible = false;

  @Input()
  topic!: string;

  constructor() {
  }

  ngOnInit(): void {
    if (!ObjectUtils.isNil(this.topic)) {
      this.isMailFormVisible = true;
    }
  }

  onEmailButtonClick(): void {
    this.isMailFormVisible = !this.isMailFormVisible;
  }

}
