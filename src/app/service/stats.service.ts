import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private  http: HttpClient) { }
  private baseURL = `http://localhost:8080/api/stats`


  getAmount(startDate: string, endDate: string):Observable<any>{
    let parameters = new HttpParams()
    parameters = parameters.append("startDate", startDate);
    parameters = parameters.append("endDate", endDate);
    return this.http.get(`${this.baseURL}/income`, {params: parameters})
  }

  getAmountByMonths(lastMonths: number):Observable<any>{
    let parameters = new HttpParams()
    parameters = parameters.append("numbersOfMonths", lastMonths);
    return this.http.get(`${this.baseURL}/monthly_income`, {params: parameters})
  }
}