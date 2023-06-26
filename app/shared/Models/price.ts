import {Deserializable} from './deserializable';


export class PriceType implements Deserializable{
  public vat;
  public totalIncVat;
  public totalExVat;
  public befor: boolean;
  constructor(){
    this.vat = 0;
    this.totalExVat = 0;
    this.totalIncVat = 0;
  }
  beforePrice(): this{
    this.totalExVat += (this.totalExVat * 10) / 100;
    this.totalExvatChange();
    return this;
  }
  totalExvatChange(){
    this.totalIncVat = this.totalExVat + (this.totalExVat * 7) / 100;
    this.vat = this.totalIncVat - this.totalExVat;
  }
  priceBefore(){
    let total = this.totalExVat;
    total +=(this.totalExVat * 10) / 100;
    return total;
  }
  deserializable(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
class EconomicPrice extends PriceType {
  constructor() {
    super();
  }

}
class ExpressPrice extends PriceType {
  constructor() {
    super();
  }
}
class QuickPrice extends PriceType {
  constructor() {
    super();
  }

}
export class Detaill {
  public description: string;
  public localisation: string;
  public date: Date;
  public dataTarget = null;

  constructor() {
  }


}

export  class Price implements Deserializable{
  public economicPrice: EconomicPrice ;
  public quickPrice: QuickPrice;
  public expressPrice: ExpressPrice;
  public recoveryPrice: number;
  constructor() {
    this.economicPrice = new EconomicPrice();
    this.quickPrice = new QuickPrice();
    this.expressPrice = new ExpressPrice() ;
    this.recoveryPrice = 0;
  }


  deserializable(input: any): this {
    Object.assign(this, input);
    this.expressPrice = new ExpressPrice().deserializable(input.expressPrice);
    this.economicPrice = new EconomicPrice().deserializable(input.economicPrice);
    this.quickPrice = new QuickPrice().deserializable(input.quickPrice);
    return this;
  }

}
