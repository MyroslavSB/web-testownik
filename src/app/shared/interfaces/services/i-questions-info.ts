import {IQuestion} from "../i-question";

export interface IQuestionsInfo {
  count: number;
  questions: IQuestion[];
  init_count: number;
}
