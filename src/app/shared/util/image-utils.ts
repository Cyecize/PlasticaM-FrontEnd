import {environment} from '../../../environments/environment';

export class ImageUtils {
  static makeLink(imageUrl: string): string {
    if (!imageUrl.startsWith('/')) {
      imageUrl = '/' + imageUrl;
    }

    return environment.backendUrl + imageUrl;
  }
}
