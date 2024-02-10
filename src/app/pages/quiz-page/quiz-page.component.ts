import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-quiz-page',
  standalone: true,
  imports: [],
  templateUrl: './quiz-page.component.html',
  styleUrl: './quiz-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizPageComponent {

}
