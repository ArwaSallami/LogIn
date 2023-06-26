import {Deserializable} from './deserializable';
import {PriceType} from './price';
import {el} from '@angular/platform-browser/testing/src/browser_util';

export class DiscountCodes implements Deserializable{
  public code: string;
  public amount: number;
  public type: string;


  deserializable(input: any): this {
    Object.assign(this, input);
    return this;
  }
  applyDiscount(price: PriceType) {
    if(this.type === 'percentage') {
      price.totalExVat -= (price.totalExVat * this.amount) / 100;

    }else {
      if(this.type === 'discount') {
        price.totalExVat -= this.amount;
      }
    }

  }





}
