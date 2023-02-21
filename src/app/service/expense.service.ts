import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ExpenseModel} from "./models/expense-model";
import {ExpenseRequestPayload} from "../expenses/create-expense/expense.request.payload";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) { }
  private baseURL = `http://localhost:8080/api/expenses`

  httpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json'
  });


  getAllExpenses():Observable<Array<ExpenseModel>>{
    return this.http.get<Array<ExpenseModel>>(`${this.baseURL}/list`);

  }
  getAllExpensesWithSpec(body:any):Observable<Array<ExpenseModel>>{
    return this.http.post<Array<ExpenseModel>>(`${this.baseURL}/list`, body,{headers:this.httpHeaders});

  }

  getExpense(expense: string) :Observable<ExpenseModel>{
    return this.http.get<ExpenseModel>(`${this.baseURL}?id=${expense}`);
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
