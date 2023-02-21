import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ExpenseModel} from "./models/expense-model";
import {ExpenseRequestPayload} from "../expenses/create-expense/expense.request.payload";
import {TagModel} from "./models/tag-model";
import {TagRequestPayload} from "../tags/update-tag/tag.request.payload";

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http: HttpClient) { }
  private baseURL = `http://localhost:8080/api/tags`

  getAllTags():Observable<Array<TagModel>>{
    return this.http.get<Array<TagModel>>(`${this.baseURL}/list`);

  }

  getTag(tag: string) :Observable<TagModel>{
    return this.http.get<TagModel>(`${this.baseURL}?id=${tag}`);
  }

  deleteTag(tag: TagModel):Observable<TagModel>{
    return this.http.delete<TagModel>(`${this.baseURL}?id=${tag.id}`);
  }

  createTag(tag: TagRequestPayload): Observable<TagModel>{
    return this.http.post<TagModel>(`${this.baseURL}`, tag);
  }

  updateTag(tag: TagModel): Observable<TagModel>{
    return this.http.put<TagModel>(`${this.baseURL}`, tag)
  }
}
