import {Pipe, PipeTransform} from '@angular/core';
import {EOptionStatuses} from "../enums/e-option-statuses";

@Pipe({
  name: 'optionStatus',
  standalone: true
})
export class OptionStatusPipe implements PipeTransform {
  private optionStatuses = EOptionStatuses

  transform(
    option_id: number,
    picked_options: number[],
    correct_options: number[],
    show_statuses: boolean = false
  ): EOptionStatuses[] {
    const pickedStatuses = [this.optionStatuses.PICKED_ANSWER]

    if (!show_statuses) {
      return picked_options.includes(option_id) ? pickedStatuses : []
    }

    const isOptionPicked = picked_options.includes(option_id);
    const isOptionCorrect = correct_options.includes(option_id);

    if (isOptionPicked) {
      return isOptionCorrect ? this.optionStatuses.CORRECT_ANSWER : this.optionStatuses.WRONG_ANSWER;
    }

    return isOptionCorrect ? this.optionStatuses.MISSED_ANSWER : null;

  }
}
