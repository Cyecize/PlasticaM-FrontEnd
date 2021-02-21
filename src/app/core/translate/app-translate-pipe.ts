import {TranslatePipe} from '@ngx-translate/core';
import {Injectable, Pipe} from '@angular/core';

@Injectable({providedIn: 'root'})
@Pipe({
  name: 'appTranslate',
  pure: false // required to update the value when the promise is resolved
})
export class AppTranslatePipe extends TranslatePipe {

}
