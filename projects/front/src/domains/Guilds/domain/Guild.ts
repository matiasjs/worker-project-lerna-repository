interface GuildPrimitives {
  _id: string;
  description: string;
}

export class Guild {
  constructor(readonly description: string, readonly _id: string) {}

  static fromPrimitives(plainData: GuildPrimitives): Guild {
    return new Guild(plainData.description, plainData._id);
  }

  toPrimitives(): GuildPrimitives {
    return {
      description: this.description,
      _id: this._id,
    };
  }
}
