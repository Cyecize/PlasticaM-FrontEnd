import {Component, Input, OnInit} from '@angular/core';
import {ObjectUtils} from '../../util/object-utils';
import {ContactInfoModel} from '../../../core/contact-info/contact-info.model';
import {ContactInfoService} from '../../../core/contact-info/contact-info.service';

@Component({
  selector: 'app-contacts-section',
  templateUrl: './contacts-section.component.html',
  styleUrls: ['./contacts-section.component.scss']
})
export class ContactsSectionComponent implements OnInit {

  isMailFormVisible = false;

  @Input()
  topic!: string;

  contactInfo?: ContactInfoModel;

  constructor(private contactInfoService: ContactInfoService) {
  }

  ngOnInit(): void {
    if (!ObjectUtils.isNil(this.topic)) {
      this.isMailFormVisible = true;
    }
    this.contactInfoService.getContactInfo().subscribe(value => this.contactInfo = value);
  }

  onEmailButtonClick(): void {
    this.isMailFormVisible = !this.isMailFormVisible;
  }
}
