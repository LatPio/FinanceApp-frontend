import {TagModel} from "../../service/models/tag-model";

export interface IncomeRequestPayload{
  amount: number;
  currency: String;
  name: String;
  date: number;
  tags: TagModel[];
}
