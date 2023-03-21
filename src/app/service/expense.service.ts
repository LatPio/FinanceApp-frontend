import {Inject, Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ExpenseModel} from "./models/expense-model";
import {ExpenseRequestPayload} from "../expenses/create-expense/expense.request.payload";
import {APP_CONFIG, AppConfig} from "../app-config.module";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService implements OnInit{

  constructor(private http: HttpClient,
              @Inject(APP_CONFIG) private config: AppConfig,
              ) { }

  ngOnInit(): void {
  }

  httpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json'
  });


  getAllExpenses():Observable<Array<ExpenseModel>>{
    return this.http.get<Array<ExpenseModel>>(`${this.config.apiEndpoint}/expenses/list`);

  }
  getAllExpensesWithSpec(body:any):Observable<Array<ExpenseModel>>{
    return this.http.post<Array<ExpenseModel>>(`${this.config.apiEndpoint}/expenses/list`, body,{headers:this.httpHeaders});

  }

  getExpense(expense: string) :Observable<ExpenseModel>{
    return this.http.get<ExpenseModel>(`${this.config.apiEndpoint}/expenses?id=${expense}`);
  }

  deleteExpense(expense: ExpenseModel):Observable<ExpenseModel>{
    return this.http.delete<ExpenseModel>(`${this.config.apiEndpoint}/expenses?id=${expense.id}`);
  }

  createExpense(expense: ExpenseRequestPayload): Observable<ExpenseModel>{
    return this.http.post<ExpenseModel>(`${this.config.apiEndpoint}/expenses`, expense);
  }

  updateExpense(expense: ExpenseModel): Observable<ExpenseModel>{
    return this.http.put<ExpenseModel>(`${this.config.apiEndpoint}/expenses`, expense)
  }





}
