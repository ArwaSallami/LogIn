import {Deserializable} from './deserializable';
import {PackagingTypePrice} from './packagingTypePrice';

export class PackagingCategorie implements Deserializable{

  public type: string;
  public packagingTypePrice: PackagingTypePrice[] =[];
  deserializable(input: any): this {
    Object.assign(this, input);
    this.packagingTypePrice = input.packagingTypePrice.map(pack => new PackagingTypePrice().deserializable(pack));
    return this;
  }

}
