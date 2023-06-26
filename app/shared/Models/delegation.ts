import {Deserializable} from './deserializable';

export class Delegation implements Deserializable {
  public name: string;
  public  zipCode: string;
  constructor () {

  }
  deserializable(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
