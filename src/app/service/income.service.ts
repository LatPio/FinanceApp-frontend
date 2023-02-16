import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ExpenseModel} from "./models/expense-model";
import {ExpenseRequestPayload} from "../expenses/create-expense/expense.request.payload";
import {IncomeModel} from "./models/income-model";
import {IncomeRequestPayload} from "../income/create-income/income.request.payload";

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  private baseURL = `http://localhost:8080/api/income`
  constructor(private http: HttpClient) { }

  getAllIncomes():Observable<Array<IncomeModel>>{
    return this.http.get<Array<IncomeModel>>(`${this.baseURL}/list`);

  }

  getIncome(income: string) :Observable<IncomeModel>{
    return this.http.get<IncomeModel>(`${this.baseURL}?id=${income}`);
  }

  deleteIncome(income: IncomeModel):Observable<IncomeModel>{
    return this.http.delete<IncomeModel>(`${this.baseURL}?id=${income.id}`);
  }

  createIncome(income: IncomeRequestPayload): Observable<IncomeModel>{
    return this.http.post<IncomeModel>(`${this.baseURL}`, income);
  }

  updateIncome(income: IncomeModel): Observable<IncomeModel>{
    return this.http.put<IncomeModel>(`${this.baseURL}`, income)
  }


}
