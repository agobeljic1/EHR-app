import { LetDirective } from './let.directive';

export class LetContext<T> {
  constructor(private readonly dir: LetDirective<T>) {}

  get ngLet(): T {
    return this.dir.ngLet;
  }
}
