import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-mail-form',
  templateUrl: './mail-form.component.html',
  styleUrls: ['./mail-form.component.scss']
})
export class MailFormComponent implements OnInit {

  @Input()
  topic!: string;

  constructor() {}

  ngOnInit(): void {
  }

}
