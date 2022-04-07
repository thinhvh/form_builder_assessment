import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { QuestionModel } from "../models/question.model";

@Injectable({
  providedIn: 'root'
})
export class QuestionFormSaveService {
  private data$ = new BehaviorSubject<QuestionModel[]>([]);

  syncData(data: QuestionModel[]) {
    this.data$.next(data);
  }

  getData$(): Observable<QuestionModel[]> {
    return this.data$.asObservable();
  }

  getData(): QuestionModel[] {
    return this.data$.getValue();
  }
}