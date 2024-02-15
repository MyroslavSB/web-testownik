import {ChangeDetectionStrategy, Component, Input, Output} from '@angular/core';
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
  @Output() optionCardPick: EventEmitter<void> = new EventEmitter<void>()

  @Input({required: true}) option: IQuestionOption
  @Input() optionPicked: boolean = false

  public pickOption(): void {
    this.optionCardPick.emit()
  }
}
