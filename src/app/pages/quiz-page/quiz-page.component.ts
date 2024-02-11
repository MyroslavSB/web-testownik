import { ChangeDetectionStrategy, Component } from '@angular/core';
import {QuestionsService} from "../../services/questions-service/questions.service";
import {Observable} from "rxjs";
import {IQuestion} from "../../shared/interfaces/i-question";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-quiz-page',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './quiz-page.component.html',
  styleUrl: './quiz-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizPageComponent {

  public activeQuestion$: Observable<IQuestion> = this.questionsService.getActiveQuestionObservable()

  constructor(
    private questionsService: QuestionsService,
  ) {
  }


}
