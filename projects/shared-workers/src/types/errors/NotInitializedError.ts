import { Type } from "../Type";

import { DomainError } from "./DomainError";

export class NotInitializedError extends DomainError {
  constructor(contextClass?: Type<any>) {
    super("not_initialized", `${contextClass?.name} is not initialized`);
  }
}
