import {
  Directive,
  Inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { LetContext } from './let-context.model';

@Directive({
  selector: '[ngLet]',
})
export class LetDirective<T> {
  @Input()
  ngLet!: T;

  constructor(
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Inject(TemplateRef) templateRef: TemplateRef<LetContext<T>>
  ) {
    viewContainer.createEmbeddedView(templateRef, new LetContext<T>(this));
  }
}
