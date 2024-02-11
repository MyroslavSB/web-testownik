import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {IQuestion} from "../../shared/interfaces/i-question";

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private activeQuestion: BehaviorSubject<IQuestion> = new BehaviorSubject<IQuestion>(null)

  private questions: BehaviorSubject<IQuestion[]> = new BehaviorSubject<IQuestion[]>([])

  constructor() {
  }

  public setQuestions(questions: IQuestion[]): void {
    this.questions.next(questions)
  }

  public getQuestionsObservable(): Observable<IQuestion[]> {
    return this.questions.asObservable()
  }

  public getActiveQuestionObservable(): Observable<IQuestion> {
    return this.activeQuestion.asObservable()
  }

  public changeActiveQuestion(): void {
    // const random_index =
  }

  public questionAnswered(): void {

  }

  public filterQuestions(): void {
    const questions = this.questions.getValue().filter(question => question.remaining_attempts)

    this.setQuestions(questions)
  }

  public canActivate(): boolean {
    return this.questions.getValue().length > 0
  }
}
