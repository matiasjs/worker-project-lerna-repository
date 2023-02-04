interface WorkersPrimitive {
  name: string;
}

export class Workers {
  constructor(readonly name: string) {}

  static fromPrimitives(plainData: WorkersPrimitive): Workers {
    return new Workers(plainData.name);
  }

  toPrimitives(): WorkersPrimitive {
    return {
      name: this.name,
    };
  }
}
