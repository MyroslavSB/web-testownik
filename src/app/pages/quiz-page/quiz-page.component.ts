import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  Signal,
  signal,
  TrackByFunction, WritableSignal
} from '@angular/core';
import {QuestionsService} from "../../services/questions-service/questions.service";
import {Observable} from "rxjs";
import {IQuestion} from "../../shared/interfaces/i-question";
import {AsyncPipe, CommonModule, NgForOf} from "@angular/common";
import {OptionCardComponent} from "../../shared/components/option-card/option-card.component";
import {IQuestionOption} from "../../shared/interfaces/i-question-option";
import {OptionPickedPipe} from "../../shared/pipes/option-picked.pipe";

@Component({
  selector: 'app-quiz-page',
  standalone: true,
  imports: [
    AsyncPipe,
    OptionCardComponent,
    NgForOf,
    CommonModule,
    OptionPickedPipe
  ],
  templateUrl: './quiz-page.component.html',
  styleUrl: './quiz-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizPageComponent implements OnInit {

  public activeQuestion$: Observable<IQuestion> = this.questionsService.getActiveQuestionObservable()

  public pickedOptions: number[] = []


  constructor(
    private questionsService: QuestionsService,
    private cdRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.changeActiveQuestion()


  }

  private changeActiveQuestion(): void {
    this.questionsService.changeActiveQuestion()
  }

  public trackOptions: TrackByFunction<IQuestionOption[]> = (option, index) => {
    // return index + option.t
  }

  public pickOption(option_id: number): void {
    if (this.pickedOptions.includes(option_id)) {
      this.pickedOptions = this.pickedOptions.filter(id => id !== option_id)

      this.cdRef.markForCheck()
      return
    }

    this.pickedOptions.push(option_id)
    this.cdRef.markForCheck()
  }
}
