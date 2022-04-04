import {FieldError} from '../field-error/field-error';
import {HttpStatus} from '../http/http-status';
import {Observable} from 'rxjs';

export class FieldErrorWrapper {

  constructor(private delegate: () => Observable<any>) {
  }

  async execute<T>(): Promise<FieldError[]|T> {
    try {
      return await this.delegate.call(null).toPromise();
    } catch (err) {
      if (err.status === HttpStatus.NOT_ACCEPTABLE) {
        return (err.error as FieldError[]);
      } else {
        return [{
          message: err.error?.message || 'Something Went Wrong',
          fieldName: ''
        }];
      }
    }
  }
}
