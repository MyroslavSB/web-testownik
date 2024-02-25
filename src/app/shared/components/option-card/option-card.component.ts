import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {IQuestionOption} from "../../interfaces/i-question-option";
import {EOptionStatuses} from "../../enums/e-option-statuses";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-option-card',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './option-card.component.html',
  styleUrl: './option-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionCardComponent {
  @Output() optionCardPick: EventEmitter<number> = new EventEmitter<number>()

  @Input({required: true}) option: IQuestionOption
  @Input() optionCardPicked: boolean = false
  @Input() correctOptions: number[] = []
  @Input() optionStatuses: EOptionStatuses[] = []


  public pickOption(): void {
    this.optionCardPick.emit(this.option.id)
  }

  public get optionClasses(): string {
    return this.optionStatuses.join(' ')
  }
}
