import { AuthUserResponse } from "../../Shared/application/responses/AuthUserResponse";

import { AuthUser } from "../domain/AuthUser";

export const authUserToResponse = (authUser: AuthUser): AuthUserResponse => {
  const primitives = authUser.toPrimitives();

  return {
    username: primitives.username,
  };
};
