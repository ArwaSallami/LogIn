import {Deserializable} from './deserializable';
import {Package} from './package';
import {BehaviorSubject} from 'rxjs';
import {Addresse} from './addresse';
import {DiscountCodes} from './discountCodes';
import {Relypoints} from './relypoints';
import {ParcourExpedition} from './parcourExpedition';

export class Expedition implements Deserializable {
   public content: string;
   public dangerous: boolean;
   public deliveryMethod: string;
   public depCity: string;
   public depZipCode: number;
   public desCity: string;
   public desZipCode: number;
   public destinationType: string;
   public senderType: string;
   public packageType: string;
   public email: string;
   public pickUpMethod: string;
   public publicCode: string;
   public privateCode: string;
   public status: string;
   public packages: Package[] = [];
   public addresses: Addresse[] = [];
   public vat;
   public totalIncVat;
   public totalExVat;
   public pickUpDate;
   public pickingTime;
   public deliveryService;
   public discountCodes: DiscountCodes;
   public depPointRelai: Relypoints;
   public desPointRelai: Relypoints;
   public recouvermentPrix: number;
   public recPaymentMethod: number;
   public validationCommercial: boolean;
   public parcoursExpeditions: ParcourExpedition[] = [];
   public createdAt;
   public updatedAt;
   public deliveryDate;
   public depot;

  constructor() {
    //this.packages = null;

  }
  // private packagesContent = new BehaviorSubject(this.packages.length);
  // currentPackages = this.packagesContent.asObservable();
  // packageChanges(packages) {
  //   this.packagesContent.next(this.packages.length);
  //
  // }
  deserializable(input: any): this {
    Object.assign(this, input);
      this.packages = input.packages.map(pack => new Package().deserializable(pack));
      this.addresses = input.addresses.map( add => new Addresse().deserializable(add));
      this.parcoursExpeditions = input.parcoursExpeditions.map( pe => new ParcourExpedition().deserializable(pe));
    return this;
  }
    originalPrice(price: number): number {

      if(this.discountCodes.type === 'percentage') {
        let p = this.discountCodes.amount / 100;
        let x = 1 -  p ;
        return (price / x);
      }
      else {
        if(this.discountCodes.type === 'discount') {
          return (price + this.discountCodes.amount);
        }
      }


    }
    packagesWeight(): number {
    if(this.packages.length === 0)
      return 0;
    let w = 0;
    for (let  pack of this.packages) {
      w += pack.weight;
    }
    return w;
    }


}
