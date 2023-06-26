import {Deserializable} from './deserializable';

export class Package implements Deserializable{

  public type: string;
  public  length: number;
  public width: number;
  public height: number;
  public  weight: number;
  public insurancePrice: number;
  public recMontant: number;
  public  recoveryMethod: string;
  public  insurance: number;
  public recoveryPrice: number;
  public packagingType: number;
  public packagingPrice: number;
  public designation: string;

  deserializable(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
