import {Deserializable} from './deserializable';
import {Delegation} from './delegation';

export class Relypoints implements Deserializable{

  public id: string;
  public acceptWeight: boolean;
  public phone: string;
  public zipCode: number;
  public longitude: string;
  public latitude: string;
  public openTime: string;
  public closeTime: string;
  public pauseTime: string;
  public secondOpen: string;
  public name: string;
  public  delegation: Delegation;
  constructor () {
  }
  deserializable(input: any): this {
    Object.assign(this, input);
    this.delegation = new Delegation().deserializable(input.delegation);
    return this;
  }


}
