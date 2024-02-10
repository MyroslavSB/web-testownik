import {IQuestionOption} from "./i-question-option";

export interface IQuestion {
  question: string;
  remaining_attempts: number;
  options: IQuestionOption[];
  correct_option_index: number;
  file_name: string;
}
