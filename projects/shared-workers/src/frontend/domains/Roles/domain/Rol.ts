interface RolPrimitives {
  _id: string;
  description: string;
}

export class Rol {
  constructor(readonly description: string, readonly _id: string) {}

  static fromPrimitives(plainData: RolPrimitives): Rol {
    return new Rol(plainData.description, plainData._id);
  }

  toPrimitives(): RolPrimitives {
    return {
      description: this.description,
      _id: this._id,
    };
  }
}
