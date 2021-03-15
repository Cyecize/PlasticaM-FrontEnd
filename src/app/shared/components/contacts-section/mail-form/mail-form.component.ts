import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Lengths} from '../../../constants/lengths';
import {QuestionModel} from '../../../../core/question/question.model';
import {TranslatorService} from '../../../../core/translate/translator.service';
import {ObjectUtils} from '../../../util/object-utils';
import {FieldError} from '../../../field-error/field-error';

@Component({
  selector: 'app-mail-form',
  templateUrl: './mail-form.component.html',
  styleUrls: ['./mail-form.component.scss']
})
export class MailFormComponent implements OnInit {

  private _topic!: string;

  get topic(): string {
    return this._topic;
  }

  @Input()
  set topic(value: string) {
    this._topic = value;
    this.setTopic();
  }

  @Input()
    // @ts-ignore
  errors: FieldError[];

  @Output()
  formSubmit: EventEmitter<QuestionModel> = new EventEmitter<QuestionModel>();

  // @ts-ignore
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private translate: TranslatorService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(Lengths.MAX_NAME_LENGTH)]],
      email: ['', [Validators.maxLength(Lengths.MAX_EMAIL_LENGTH), Validators.email]],
      phoneNumber: ['', [Validators.maxLength(Lengths.MAX_VARCHAR)]],
      message: ['', [Validators.required]],
    });

    this.setTopic();
  }

  onFormSubmit(): void {
    this.formSubmit.emit(this.form?.value);
  }

  private setTopic(): void {
    if (!ObjectUtils.isNil(this.topic) && !ObjectUtils.isNil(this.form)) {
      this.translate.getTranslation(this.topic).subscribe(value => this.form.controls.message.setValue(value));
    }
  }
}
