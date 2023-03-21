import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserOptionsModel} from "./models/userOptions-model";
import {APP_CONFIG, AppConfig} from "../app-config.module";

@Injectable({
  providedIn: 'root'
})
export class UserOptionsService {

  constructor(private http: HttpClient,
              @Inject(APP_CONFIG) private config: AppConfig) { }

  getUserOptions():Observable<UserOptionsModel>{
    return this.http.get<UserOptionsModel>(`${this.config.apiEndpoint}/options`)
  }

  updateUserOptions(userOptions: UserOptionsModel):Observable<UserOptionsModel>{
    return this.http.put<UserOptionsModel>(`${this.config.apiEndpoint}/options`, userOptions);
  }

}
