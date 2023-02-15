import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ExpenseModel} from "./expense-model";
import {ExpenseRequestPayload} from "../expenses/create-expense/expense.request.payload";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) { }
  private baseURL = `http://localhost:8080/api/expenses`

  getAllExpenses():Observable<Array<ExpenseModel>>{
    return this.http.get<Array<ExpenseModel>>(`${this.baseURL}/list`);

  }

  getExpense(expense: ExpenseModel) :Observable<ExpenseModel>{
    return this.http.get<ExpenseModel>(`${this.baseURL}?id=${expense.id}`);
  }

  deleteExpense(expense: ExpenseModel):Observable<ExpenseModel>{
    return this.http.delete<ExpenseModel>(`${this.baseURL}?id=${expense.id}`);
  }

  createExpense(expense: ExpenseRequestPayload): Observable<ExpenseModel>{
    return this.http.post<ExpenseModel>(`${this.baseURL}`, expense);
  }

  updateExpense(expense: ExpenseModel): Observable<ExpenseModel>{
    return this.http.put<ExpenseModel>(`${this.baseURL}`, expense)
  }



}