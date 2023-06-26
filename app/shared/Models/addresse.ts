import {Deserializable} from './deserializable';

export class Addresse implements Deserializable{

  public type: string;
  public firstName: string;
  public lastName: string;
  public municipality: string;
  public zipCode: number;
  public phoneNumber: string;
  public email: string;
  public complementOfAddress: string;
  public address: string;

  deserializable(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
