import {IQuestionOption} from "./i-question-option";

export interface IQuestion {
  question: string;
  fe_id: number;
  remaining_attempts: number;
  options: IQuestionOption[];
  correct_option_ids: number[];
  file_name: string;
}
