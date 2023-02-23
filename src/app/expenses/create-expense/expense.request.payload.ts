import {TagModel} from "../../service/models/tag-model";

export interface ExpenseRequestPayload{
  amount: number;
  currency: String;
  name: String;
  date: number;
  tags: TagModel[];
}
