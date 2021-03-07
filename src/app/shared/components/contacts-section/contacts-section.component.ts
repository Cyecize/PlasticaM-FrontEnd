import {Component, Input, OnInit} from '@angular/core';
import {ObjectUtils} from '../../util/object-utils';
import {ContactInfoModel} from '../../../core/contact-info/contact-info.model';
import {ContactInfoService} from '../../../core/contact-info/contact-info.service';
import {QuestionService} from '../../../core/question/question.service';
import {FieldError} from '../../field-error/field-error';
import {QuestionModel} from '../../../core/question/question.model';
import {LoaderService} from '../loader/loader.service';

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

  errors: FieldError[] = [];

  info?: string;

  constructor(private contactInfoService: ContactInfoService,
              private questionService: QuestionService,
              private loaderService: LoaderService) {
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

  async onFormSubmit(payload: QuestionModel): Promise<void> {
    this.errors = [];

    this.loaderService.show();
    this.errors = await this.questionService.sendQuestion(payload);
    this.loaderService.hide();

    if (this.errors.length < 1) {
      this.isMailFormVisible = false;
      this.info = 'question.was.sent';
    }
  }
}
