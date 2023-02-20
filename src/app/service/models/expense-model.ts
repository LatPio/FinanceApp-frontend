import {TagModel} from "./tag-model";

export class ExpenseModel{

  id: number;
  name: string;
  amount: number;
  currency: string;
  tags: TagModel[];
  // user: number;

}
