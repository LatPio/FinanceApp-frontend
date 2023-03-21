import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {IncomeModel} from "./models/income-model";
import {IncomeRequestPayload} from "../income/create-income/income.request.payload";
import {APP_CONFIG, AppConfig} from "../app-config.module";

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http: HttpClient,
              @Inject(APP_CONFIG) private config: AppConfig) { }

  httpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json'
  });

  getAllIncomes():Observable<Array<IncomeModel>>{
    return this.http.get<Array<IncomeModel>>(`${this.config.apiEndpoint}/income/list`);
  }
  getAllIncomesWithSpec(body:any):Observable<Array<IncomeModel>>{
    return this.http.post<Array<IncomeModel>>(`${this.config.apiEndpoint}/income/list`, body,{headers:this.httpHeaders})
  }

  getIncome(income: string) :Observable<IncomeModel>{
    return this.http.get<IncomeModel>(`${this.config.apiEndpoint}/income?id=${income}`);
  }

  deleteIncome(income: IncomeModel):Observable<IncomeModel>{
    return this.http.delete<IncomeModel>(`${this.config.apiEndpoint}/income?id=${income.id}`);
  }

  createIncome(income: IncomeRequestPayload): Observable<IncomeModel>{
    return this.http.post<IncomeModel>(`${this.config.apiEndpoint}/income`, income);
  }

  updateIncome(income: IncomeModel): Observable<IncomeModel>{
    return this.http.put<IncomeModel>(`${this.config.apiEndpoint}/income`, income)
  }


}
