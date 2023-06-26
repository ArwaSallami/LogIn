import {Deserializable} from './deserializable';
import {Expedition} from './expedition';

export class Reclamation implements Deserializable {
  public type: string;
  public reference: string;
  public message: string;
  public status: string;
  public createdAt: string;
  public expedition: Expedition;
  constructor() {
  }
  deserializable(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
