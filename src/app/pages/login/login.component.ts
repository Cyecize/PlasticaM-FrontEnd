import {Component, OnInit} from '@angular/core';
import {FieldError} from '../../shared/field-error/field-error';
import {LoginModel} from '../../core/user/login.model';
import {LoaderService} from '../../shared/components/loader/loader.service';
import {UserService} from '../../core/user/user.service';
import {RouteNavigator} from '../../core/routing/route-navigator.service';
import {AppRoutingPath} from '../../app-routing.path';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Lengths} from '../../shared/constants/lengths';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errors: FieldError[] = [];

  // @ts-ignore
  form: FormGroup;

  constructor(private loaderService: LoaderService,
              private userService: UserService,
              private nav: RouteNavigator,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(Lengths.MAX_NAME_LENGTH)]],
      password: ['', [Validators.maxLength(Lengths.MAX_VARCHAR)]],
    });
  }

  async onFormSubmit(): Promise<void> {
    const payload: LoginModel = this.form.value;
    this.errors = [];

    this.loaderService.show();
    this.errors = await this.userService.login(payload);
    this.form.controls.password.setValue('');
    this.loaderService.hide();

    if (this.errors.length < 1) {
      this.nav.navigate(AppRoutingPath.HOME);
    }
  }
}
