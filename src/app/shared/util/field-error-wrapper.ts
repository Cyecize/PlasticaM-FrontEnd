import {FieldError} from '../field-error/field-error';
import {HttpStatus} from '../http/http-status';
import {Observable} from 'rxjs';

export class FieldErrorWrapper {

  constructor(private delegate: () => Observable<any>) {
  }

  async execute(): Promise<FieldError[]> {
    try {
      await this.delegate.call(null).toPromise();
    } catch (err) {
      if (err.status === HttpStatus.NOT_ACCEPTABLE) {
        return (err.error as FieldError[]);
      } else {
        return [{
          message: 'Something Went Wrong',
          propertyPath: ''
        }];
      }
    }

    return [];
  }
}
