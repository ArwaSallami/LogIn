import {Deserializable} from './deserializable';
import {StatusParcourExpedition} from './statusParcourExpedition';

export class ParcourExpedition implements Deserializable{

  public type: string;
  public active: boolean;
  public success: boolean;
  public updatedAt;
  public reciverDepot: Depot;
  public statusParcourExpeditions: StatusParcourExpedition [] = [];
  constructor() {
  }

  deserializable(input: any): this {
    Object.assign(this, input);
    this.statusParcourExpeditions = input.statusParcourExpeditions.map( spe => new StatusParcourExpedition().deserializable(spe));
    return this;
  }

}
export class Depot implements Deserializable {
  public name: string;
  deserializable(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
