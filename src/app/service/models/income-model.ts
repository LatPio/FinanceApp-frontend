import {TagModel} from "./tag-model";

export class IncomeModel{


  id: number;
  amount: number;
  currency: string;
  name: string;
  tags: TagModel[];
  // user: number;

}
