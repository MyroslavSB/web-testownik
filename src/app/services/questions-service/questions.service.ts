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
    const length = this.questions.getValue().length
    const random_index = Math.floor(Math.random() * length)

    this.activeQuestion.next(this.questions.getValue()[random_index])
  }

  public questionAnswered(): void {

  }

  public filterQuestions(): void {
    const questions = this.questions.getValue().filter(question => question.remaining_attempts)

    this.setQuestions(questions)
  }

  public get correctAnswersCount(): number {
    return this.questions.getValue().filter(question => question.remaining_attempts === 0).length
  }


  public canActivate(): boolean {
    return this.questions.getValue().length > 0
  }
}
