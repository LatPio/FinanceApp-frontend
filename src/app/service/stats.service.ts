import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {APP_CONFIG, AppConfig} from "../app-config.module";

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private  http: HttpClient,
              @Inject(APP_CONFIG) private config: AppConfig) { }

  getAmountIncome(startDate: string, endDate: string):Observable<any>{
    let parameters = new HttpParams()
    parameters = parameters.append("startDate", startDate);
    parameters = parameters.append("endDate", endDate);
    return this.http.get(`${this.config.apiEndpoint}/stats/income`, {params: parameters})
  }

  getAmountByMonthsIncome(lastMonths: number):Observable<any>{
    let parameters = new HttpParams()
    parameters = parameters.append("numbersOfMonths", lastMonths);
    return this.http.get(`${this.config.apiEndpoint}/stats/monthly_income`, {params: parameters})
  }

  getAmountExpense(startDate: string, endDate: string):Observable<any>{
    let parameters = new HttpParams()
    parameters = parameters.append("startDate", startDate);
    parameters = parameters.append("endDate", endDate);
    return this.http.get(`${this.config.apiEndpoint}/stats/expense`, {params: parameters})
  }

  getAmountByMonthsExpense(lastMonths: number):Observable<any>{
    let parameters = new HttpParams()
    parameters = parameters.append("numbersOfMonths", lastMonths);
    return this.http.get(`${this.config.apiEndpoint}/stats/monthly_expense`, {params: parameters})
  }

  getAmountsByTagsByIncome(startDate: string, endDate: string): Observable<any>{
    let parameters = new HttpParams()
    parameters = parameters.append("startDate", startDate);
    parameters = parameters.append("endDate", endDate);
    return this.http.get(`${this.config.apiEndpoint}/stats/month_income_by_tags`, {params: parameters})
  }

  getAmountsByTagsByExpense(startDate: string, endDate: string): Observable<any>{
    let parameters = new HttpParams()
    parameters = parameters.append("startDate", startDate);
    parameters = parameters.append("endDate", endDate);
    return this.http.get(`${this.config.apiEndpoint}/stats/month_expense_by_tags`, {params: parameters})
  }

  getFirstEntryDate():Observable<any>{
    return this.http.get(`${this.config.apiEndpoint}/stats/firstEntryDate`)
  }

  getYears():Observable<any>{
    return this.http.get(`${this.config.apiEndpoint}/stats/listOfYears`)
  }

  getDetailedInfoIncome(year: number):Observable<any>{
    let parameters = new HttpParams()
    parameters = parameters.append("year", year);
    return this.http.get(`${this.config.apiEndpoint}/stats/detailedInfoIncome`,{params: parameters})
  }
  getDetailedInfoExpense(year: number):Observable<any>{
    let parameters = new HttpParams()
    parameters = parameters.append("year", year);
    return this.http.get(`${this.config.apiEndpoint}/stats/detailedInfoExpense`,{params: parameters})
  }
}
