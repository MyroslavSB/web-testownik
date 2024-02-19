import {ChangeDetectionStrategy, Component, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {IQuestionOption} from "../../interfaces/i-question-option";
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-option-card',
  standalone: true,
  imports: [],
  templateUrl: './option-card.component.html',
  styleUrl: './option-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionCardComponent {
  @Output() optionCardPick: EventEmitter<number> = new EventEmitter<number>()

  @Input({required: true}) option: IQuestionOption
  @Input() optionCardPicked: boolean = false
  @Input() correctOptions: number[] = []
  @Input() showStatus: boolean = false



  public pickOption(): void {
    this.optionCardPick.emit(this.option.id)
  }
}
