import {Deserializable} from './deserializable';

export class StatusParcourExpedition implements Deserializable {

  public type: string;
  public active: boolean;
  public success: boolean;
  public updatedAt;
  constructor() {

  }

  deserializable(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
