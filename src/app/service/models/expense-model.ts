import {TagModel} from "./tag-model";

export class ExpenseModel{

  id: number;
  name: string;
  amount: number;
  currency: string;
  date: number;
  tags: TagModel[];

}
