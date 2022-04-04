import {Base64File} from './base64-file';

export class Base64FileUtil {
  public static createBase64File(base64: string, fileName: string): Base64File {
    const contentType = base64.split(':')[0].replace('data:', '');
    return {fileName, contentType, base64};
  }
}
