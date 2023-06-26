import {Deserializable} from './deserializable';

export class PackagingTypePrice implements Deserializable{

  public type: string;
  public price: number;
  deserializable(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
