import {ChangeDetectionStrategy, Component, OnInit, TrackByFunction} from '@angular/core';
import {QuestionsService} from "../../services/questions-service/questions.service";
import {Observable} from "rxjs";
import {IQuestion} from "../../shared/interfaces/i-question";
import {AsyncPipe, CommonModule, NgForOf} from "@angular/common";
import {OptionCardComponent} from "../../shared/components/option-card/option-card.component";
import {IQuestionOption} from "../../shared/interfaces/i-question-option";

@Component({
  selector: 'app-quiz-page',
  standalone: true,
  imports: [
    AsyncPipe,
    OptionCardComponent,
    NgForOf,
    CommonModule
  ],
  templateUrl: './quiz-page.component.html',
  styleUrl: './quiz-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizPageComponent implements OnInit {

  public activeQuestion$: Observable<IQuestion> = this.questionsService.getActiveQuestionObservable()

  constructor(
    private questionsService: QuestionsService,
  ) {
  }

  ngOnInit() {
    this.changeActiveQuestion()
  }

  private changeActiveQuestion(): void {
    this.questionsService.changeActiveQuestion()
  }

  public trackOptions: TrackByFunction<IQuestionOption> = (option, index) => {
    return index
  }

}
