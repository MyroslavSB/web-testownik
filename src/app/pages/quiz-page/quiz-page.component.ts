import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  TrackByFunction
} from '@angular/core';
import {QuestionsService} from "../../services/questions-service/questions.service";
import {Observable} from "rxjs";
import {IQuestion} from "../../shared/interfaces/i-question";
import {AsyncPipe, CommonModule, NgForOf} from "@angular/common";
import {OptionCardComponent} from "../../shared/components/option-card/option-card.component";
import {IQuestionOption} from "../../shared/interfaces/i-question-option";
import {OptionPickedPipe} from "../../shared/pipes/option-picked.pipe";
import {TwoNumsRatioPipe} from "../../shared/pipes/two-ints-ration.pipe";
import {TimerService} from "../../services/timer.service";
import {TimerPipe} from "../../shared/pipes/timer.pipe";
import {IQuestionsInfo} from "../../shared/interfaces/services/i-questions-info";

@Component({
  selector: 'app-quiz-page',
  standalone: true,
  imports: [
    AsyncPipe,
    OptionCardComponent,
    NgForOf,
    CommonModule,
    OptionPickedPipe,
    TwoNumsRatioPipe,
    TimerPipe
  ],
  templateUrl: './quiz-page.component.html',
  styleUrl: './quiz-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TimerService]
})
export class QuizPageComponent implements OnInit {

  public activeQuestion$: Observable<IQuestion> = this.questionsService.getActiveQuestionObservable()

  public pickedOptions: number[] = []

  public correctAnswers$: Observable<number> = this.questionsService.correctAnswersCount
  public wrongAnswers$: Observable<number> = this.questionsService.wrongAnswersCount

  public questionsInfo$: Observable<IQuestionsInfo> = this.questionsService.questionsObservable
  public passedQuestions$: Observable<number> = this.questionsService.passedQuestions

  public showStatuses: boolean = false

  public timeElapsed$: Observable<number> = this.timerService.timeElapsed

  constructor(
    private questionsService: QuestionsService,
    private cdRef: ChangeDetectorRef,
    private timerService: TimerService
  ) {
  }

  ngOnInit() {
    this.changeActiveQuestion()

    this.startTimer()
  }

  private startTimer(): void {
    this.timerService.startTimer(Date.now())

  }

  private changeActiveQuestion(): void {
    this.questionsService.setRandomActiveQuestion()
  }

  public trackOptions: TrackByFunction<IQuestionOption> = (index, option) => {
    return option.text
  }

  public pickOption(option_id: number): void {
    if (this.pickedOptions.includes(option_id)) {
      this.pickedOptions = this.pickedOptions.filter(id => id !== option_id)

      this.cdRef.detectChanges()
      return
    }

    this.pickedOptions = [...this.pickedOptions, option_id]

    this.cdRef.detectChanges()
  }

  public submitAnswer(): void {
    if (!this.showStatuses) {
      this.questionsService.questionAnswered(this.pickedOptions)
      this.showStatuses = true
      this.cdRef.detectChanges()
      return

    }

    this.showStatuses = false
    this.pickedOptions = []
    this.questionsService.setRandomActiveQuestion()
    this.cdRef.detectChanges()
  }
}

