
export interface IFlow {
  destFolder: string;
  srcFolder: string;
  entity: string
}

export class Flow implements IFlow {
  constructor(
      public destFolder: string, public srcFolder: string,
      public entity: string) {}
}
