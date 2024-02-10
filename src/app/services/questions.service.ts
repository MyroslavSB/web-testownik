import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {IQuestion} from "../shared/interfaces/i-question";

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private questions: BehaviorSubject<IQuestion[]> = new BehaviorSubject<IQuestion[]>([])

  constructor() {
  }

  public setQuestions(questions: IQuestion[]): void {
    this.questions.next(questions)
  }

  public getQuestionsObservable(): Observable<IQuestion[]> {
    return this.questions.asObservable()
  }
}
