import {ChangeDetectionStrategy, Component, DestroyRef, inject} from '@angular/core';
import {QuestionsProcessingService} from "../../../services/questions-processing.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {QuestionsService} from "../../../services/questions.service";

@Component({
  selector: 'app-file-drop-down',
  standalone: true,
  imports: [],
  templateUrl: './file-drop-down.component.html',
  styleUrl: './file-drop-down.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileDropDownComponent {

  private destroyRef = inject(DestroyRef)

  constructor(
    private questionProcessingService: QuestionsProcessingService,
    private questionsService: QuestionsService
  ) {
  }

  public onFileDrop($event: any | Event): void {

    this.questionProcessingService.processFiles(Array.from($event.target.files))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(questions => {
        console.log(questions)
        this.questionsService.setQuestions(questions)
      })
  }

}
