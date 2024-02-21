import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {IQuestion} from "../../shared/interfaces/i-question";
import {IQuestionsInfo} from "../../shared/interfaces/services/i-questions-info";
import {DefaultQuestionsInfo} from "../../shared/const/default-questions-info";

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private questionsInfo: BehaviorSubject<IQuestionsInfo> = new BehaviorSubject<IQuestionsInfo>(DefaultQuestionsInfo)
  private activeQuestion: BehaviorSubject<IQuestion> = new BehaviorSubject<IQuestion>(null)

  private passedQuestionsCount: BehaviorSubject<number> = new BehaviorSubject<number>(0)

  private correctAnswers: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  private wrongAnswers: BehaviorSubject<number> = new BehaviorSubject<number>(0)

  constructor() {
  }

  public setQuestions(questions: IQuestion[]): void {
    this.questionsInfo.next({questions, count: questions.length, init_count: questions.length})
  }

  public get questionsObservable(): Observable<IQuestionsInfo> {
    return this.questionsInfo.asObservable()
  }

  public getActiveQuestionObservable(): Observable<IQuestion> {
    return this.activeQuestion.asObservable()
  }

  public setRandomActiveQuestion(): void {
    const length = this.questionsInfo.getValue().count
    const random_index = Math.floor(Math.random() * length)

    this.activeQuestion.next(this.questionsInfo.getValue().questions[random_index])
  }

  public questionAnswered(picked_options: number[]): void {
    const active_question: IQuestion = this.activeQuestion.getValue()

    const optionCorrect = (id: number) => picked_options.includes(id)
    const passed: boolean = active_question.correct_option_ids.every(optionCorrect)

    this.countAnswersStats(passed)

    // if user passed last required question attempt then remove it from the list

    if (passed && active_question.remaining_attempts === 1) {
      const new_questions = this.questionsInfo.getValue().questions.filter(question => question.fe_id !== active_question.fe_id)
      this.passedQuestionsCount.next(this.passedQuestionsCount.getValue() + 1)

      this.questionsInfo.next({
        ...this.questionsInfo.getValue(),
        questions: new_questions,
        count: new_questions.length
      })

      return
    }

    const attempts_update = passed ? -1 : 1
    active_question.remaining_attempts = active_question.remaining_attempts + attempts_update

    const new_questions = this.questionsInfo.getValue().questions.map(question => ({
      ...question,
      remaining_attempts:
        question.fe_id === active_question.fe_id ?
          active_question.remaining_attempts :
          question.remaining_attempts
    }))

    this.questionsInfo.next({
      ...this.questionsInfo.getValue(),
      questions: new_questions,
      count: new_questions.length
    })
  }

  private countAnswersStats(passed: boolean = false): void {
    if (passed) {
      this.correctAnswers.next(this.correctAnswers.getValue() + 1)
      return
    }

    this.wrongAnswers.next(this.wrongAnswers.getValue() + 1)
  }

  public get correctAnswersCount(): Observable<number> {
    return this.correctAnswers.asObservable()
  }

  public get wrongAnswersCount(): Observable<number> {
    return this.wrongAnswers.asObservable()
  }


  public get passedQuestions(): Observable<number> {
    return this.passedQuestionsCount.asObservable()
  }

  public canActivate(): boolean {
    return this.questionsInfo.getValue().count > 0
  }
}
