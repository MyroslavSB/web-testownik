import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {IQuestion} from "../../shared/interfaces/i-question";

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private questions: BehaviorSubject<IQuestion[]> = new BehaviorSubject<IQuestion[]>([])
  private activeQuestion: BehaviorSubject<IQuestion> = new BehaviorSubject<IQuestion>(null)

  private totalQuestionsCount: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  private passedQuestionsCount: BehaviorSubject<number> = new BehaviorSubject<number>(0)

  private correctAnswers: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  private wrongAnswers: BehaviorSubject<number> = new BehaviorSubject<number>(0)

  constructor() {
  }

  public setQuestions(questions: IQuestion[]): void {
    this.questions.next(questions)
    this.totalQuestionsCount.next(questions.length)
  }

  public get questionsObservable(): Observable<IQuestion[]> {
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

  public questionAnswered(picked_options: number[]): void {
    let questionPassed = false
    const active = this.activeQuestion.getValue()
    active.correct_option_index
  }

  public filterQuestions(): void {
    const questions = this.questions.getValue().filter(question => question.remaining_attempts)

    this.setQuestions(questions)
  }

  public get correctAnswersCount(): Observable<number> {
    return this.correctAnswers.asObservable()
  }

  public get wrongAnswersCount(): Observable<number>  {
    return this.wrongAnswers.asObservable()
  }

  public get totalQuestions(): Observable<number> {
    return this.totalQuestionsCount.asObservable()
  }

  public get passedQuestions(): Observable<number> {
    return this.passedQuestionsCount.asObservable()
  }
  public canActivate(): boolean {
    return this.questions.getValue().length > 0
  }
}
