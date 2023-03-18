import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserOptionsModel} from "./models/userOptions-model";

@Injectable({
  providedIn: 'root'
})
export class UserOptionsService {

  constructor(private http: HttpClient) { }
  private baseURL = `http://localhost:8080/api/options`

  getUserOptions():Observable<UserOptionsModel>{
    return this.http.get<UserOptionsModel>(this.baseURL)
  }

  updateUserOptions(userOptions: UserOptionsModel):Observable<UserOptionsModel>{
    return this.http.put<UserOptionsModel>(this.baseURL, userOptions);
  }

}
