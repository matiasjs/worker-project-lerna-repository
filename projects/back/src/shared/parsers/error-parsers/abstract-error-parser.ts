import { AyobaHttpException } from '../ayoba-http-exception';

export abstract class AbstractErrorParser {
  abstract name: string;

  abstract test(exception: any): boolean;

  abstract create(exception): AyobaHttpException;
}
