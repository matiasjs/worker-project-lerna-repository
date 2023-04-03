import { AggregateRoot } from "../AggregateRoot";
import { Type } from "../Type";

import { DomainError } from "./DomainError";

export class AlreadyExistsError extends DomainError {
  constructor(contextClass?: Type<AggregateRoot>) {
    super("already_exists", `${contextClass?.name} already exists`);
  }
}
