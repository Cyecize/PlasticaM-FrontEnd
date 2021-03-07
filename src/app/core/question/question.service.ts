import {Injectable} from '@angular/core';
import {QuestionModel} from './question.model';
import {FieldError} from '../../shared/field-error/field-error';
import {HttpClientService} from '../../shared/http/http-client.service';
import {Endpoints} from '../../shared/http/endpoints';
import {FieldErrorWrapper} from '../../shared/util/field-error-wrapper';

@Injectable({providedIn: 'root'})
export class QuestionService {

  constructor(private http: HttpClientService) {
  }

  public async sendQuestion(question: QuestionModel): Promise<FieldError[]> {
    return new FieldErrorWrapper(() => this.http.post(Endpoints.QUESTION, question)).execute();
  }
}
