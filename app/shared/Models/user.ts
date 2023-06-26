import {Deserializable} from './deserializable';

export class User implements Deserializable {
  public address: string;
  public city: string;
  public companyName: string;
  public email: string;
  public firstName: string;
  public isPro: boolean;
  public lastName: string;
  public phoneNumber: number;
  public zipCode: number;
  public vatNumber: string;
  public accountType: string;

  deserializable(input: any): this {
    Object.assign(this, input);
    return this;
  }




}
