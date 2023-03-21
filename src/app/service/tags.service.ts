import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ExpenseModel} from "./models/expense-model";
import {ExpenseRequestPayload} from "../expenses/create-expense/expense.request.payload";
import {TagModel} from "./models/tag-model";
import {TagRequestPayload} from "../tags/update-tag/tag.request.payload";
import {APP_CONFIG, AppConfig} from "../app-config.module";

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http: HttpClient,
              @Inject(APP_CONFIG) private config: AppConfig) { }

  getAllTags():Observable<Array<TagModel>>{
    return this.http.get<Array<TagModel>>(`${this.config.apiEndpoint}/tags/list`);

  }

  getTag(tag: string) :Observable<TagModel>{
    return this.http.get<TagModel>(`${this.config.apiEndpoint}/tags?id=${tag}`);
  }

  deleteTag(tag: TagModel):Observable<TagModel>{
    return this.http.delete<TagModel>(`${this.config.apiEndpoint}/tags?id=${tag.id}`);
  }

  createTag(tag: TagRequestPayload): Observable<TagModel>{
    return this.http.post<TagModel>(`${this.config.apiEndpoint}/tags`, tag);
  }

  updateTag(tag: TagModel): Observable<TagModel>{
    return this.http.put<TagModel>(`${this.config.apiEndpoint}/tags`, tag)
  }
}
